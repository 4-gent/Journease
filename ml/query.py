from flask import Flask, request, jsonify
import modal
import json
import re

app = Flask(__name__)

# Initialize Modal
modal_app = modal.App()
llama_function = modal.Function.lookup("example-tgi-Meta-Llama-3-70B-Instruct", "Model.generate")

# change this localhost:3000/ !! 
@app.route('/temp', methods=['GET', 'POST'])
def format_query():
    if request.method == 'POST':
        user_prompt = request.form('prompt')
    
    prompt = f"""
        Extract the following details from the user's input:

        Location
        Price
        Food
        Cuisine
        Any other details

        User input: "{user_prompt}"

        Output dict with keys: location, price, food, cuisine, other_details.
    """

    # Assuming llama_function.remote returns a dictionary or JSON response
    response = llama_function.remote(prompt)
    
    return response

# http://127.0.0.1:4000/query
@app.route('/query', methods=['GET', 'POST'])
def query():
    # template
    formatted_query = format_query()

    prompt = f"""

    "{formatted_query}"

    Only return in this JSON format:
    {{
    "name": "",
    "address": "",
    "distance": "",
    "price_range": "",
    "hours": {{
        "monday": "",
        "tuesday": "",
        "wednesday": "",
        "thursday": "",
        "friday": "",
        "saturday": "",
        "sunday": ""
        }}
    }}
    """
    result = llama_function.remote(prompt)
    
    # Use regex to extract the JSON part
    json_match = re.search(r'\[(.*?)\]', result, re.DOTALL)
    if json_match:
        json_data = json_match.group(0)
        # Parse the JSON data
        data = json.loads(json_data)
    else:
        print("No JSON data found.")
    
    print(result)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    result = query()
