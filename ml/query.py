import modal


# second I want to utilize llama 
prompt = """
I don't know what food I want, but I want food that is affordable and nearby 1185 Borregas Ave, Sunnyale, 
can you also provide the hours of operation? store each in json format!
"""

f = modal.Function.lookup("example-tgi-Meta-Llama-3-70B-Instruct", "Model.generate")
f.remote(prompt)
