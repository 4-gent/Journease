# This file contains an integration of Llama-3 70B in Modal

# modal deploying LLama-3 to create generative responses!

# modal deploy LLama-3.py

import os
import subprocess
from pathlib import Path

from modal import App, Image, Mount, Secret, asgi_app, enter, exit, gpu, method
MODEL_ID = "meta-llama/Meta-Llama-3-70B-Instruct"
MODEL_REVISION = "81ca4500337d94476bda61d84f0c93af67e4495f"
LAUNCH_FLAGS = [
    "--model-id",
    MODEL_ID,
    "--port",
    "8000",
    "--revision",
    MODEL_REVISION,
]

def download_model():
    subprocess.run(
        [
            "text-generation-server",
            "download-weights",
            MODEL_ID,
            "--revision",
            MODEL_REVISION,
        ],
    )

app = App(
    "example-tgi-" + MODEL_ID.split("/")[-1]
)  # Note: prior to April 2024, "app" was called "stub"

tgi_image = (
    Image.from_registry("ghcr.io/huggingface/text-generation-inference:1.4")
    .dockerfile_commands("ENTRYPOINT []")
    .run_function(
        download_model,
        secrets=[Secret.from_name("huggingface-secret")],
        timeout=86000,
    )
    .pip_install("text-generation")
)

GPU_CONFIG = gpu.H100(count=2)  # 2 H100s

# timesout in 20 minutes
@app.cls(
    secrets=[Secret.from_name("huggingface-secret")],
    gpu=GPU_CONFIG,
    allow_concurrent_inputs=15,
    container_idle_timeout=1200,
    timeout=60 * 60,
    image=tgi_image,
)
class Model:
    @enter()
    def start_server(self):
        import socket
        import time

        from text_generation import AsyncClient

        self.launcher = subprocess.Popen(
            ["text-generation-launcher"] + LAUNCH_FLAGS,
            env={
                **os.environ,
                "HUGGING_FACE_HUB_TOKEN": os.environ["HF_TOKEN"],
            },
        )
        self.client = AsyncClient("http://127.0.0.1:8000", timeout=60)
        self.template = """<|begin_of_text|><|start_header_id|>user<|end_header_id|>

{user}<|eot_id|><|start_header_id|>assistant<|end_header_id|>

"""

        # Poll until webserver at 127.0.0.1:8000 accepts connections before running inputs.
        def webserver_ready():
            try:
                socket.create_connection(("127.0.0.1", 8000), timeout=1).close()
                return True
            except (socket.timeout, ConnectionRefusedError):
                # Check if launcher webserving process has exited.
                # If so, a connection can never be made.
                retcode = self.launcher.poll()
                if retcode is not None:
                    raise RuntimeError(
                        f"launcher exited unexpectedly with code {retcode}"
                    )
                return False

        while not webserver_ready():
            time.sleep(1.0)

        print("Webserver ready!")

    @exit()
    def terminate_server(self):
        self.launcher.terminate()

    @method()
    async def generate(self, question: str):
        prompt = self.template.format(user=question)
        result = await self.client.generate(
            prompt, max_new_tokens=1024, stop_sequences=["<|eot_id|>"]
        )

        return result.generated_text

    @method()
    async def generate_stream(self, question: str):
        prompt = self.template.format(user=question)

        async for response in self.client.generate_stream(
            prompt, max_new_tokens=1024, stop_sequences=["<|eot_id|>"]
        ):
            if (
                not response.token.special
                and response.token.text != "<|eot_id|>"
            ):
                yield response.token.text

@app.local_entrypoint()
def main(prompt: str = None):
    if prompt is None:
        prompt = "Implement a Python function to compute the Fibonacci numbers."
    print(Model().generate.remote(prompt))