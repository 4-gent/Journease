import modal


# second I want to utilize llama 
prompt = """
Could you list food spots near 95111 that fits this criteria?
    Food: Pho
    Cuisine: Vietnamese
    Price Range: 
    
"""

f = modal.Function.lookup("example-tgi-Meta-Llama-3-70B-Instruct", "Model.generate")
print(f.remote(prompt))