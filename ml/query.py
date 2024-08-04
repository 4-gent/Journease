from flask import Flask, request, jsonify
from flask_cors import CORS
import modal
import json
import re

from fake_data import speeddial_data

app = Flask(__name__)
CORS(app, origins = ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4000'])


# Initialize Modal
modal_app = modal.App()
llama_function = modal.Function.lookup("example-tgi-Meta-Llama-3-70B-Instruct", "Model.generate")
"""
# change this localhost:3000/ !! 
@app.route('/temp', methods=[ 'POST'])
def format_query():
    try:
        
        if request.method == 'POST':
            
            user_prompt = request.json.get('prompt')
            
            
            print(user_prompt)
            prompt = f
                Extract the following details from the user's input:

                Location
                Price
                Food
                Cuisine
                Any other details

                User input: "{user_prompt}"

                Output dict with keys: location, price, food, cuisine, other_details.
            

            # Assuming llama_function.remote returns a dictionary or JSON response
            response = llama_function.remote(prompt)
        
            return response
        else:
            return "Failed"
    except Exception as e:
        print(e)

"""

# http://127.0.0.1:4000/query
@app.route('/temp', methods=['GET', 'POST'])
def query():
    if request.method == 'POST':
        user_prompt = request.json.get('prompt')
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
            
        # template
        response = llama_function.remote(prompt)

        prompt = f"""
        List restaurants given the following query:
        "{response}"
        
        Give suggestions based on the following location history: 
        {speeddial_data}

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
            return jsonify(data)
        else:
            return ("No JSON data found.")
    
    else:
        return "bad"

if __name__ == '__main__':
    app.run(debug=True, port=8080)
    result = query()
