from flask import Flask
import modal
import json
import re

app = Flask(__name__)

# Initialize Modal
modal_app = modal.App()
llama_function = modal.Function.lookup("example-tgi-Meta-Llama-3-70B-Instruct", "Model.generate")

@app.route('/query', methods=['GET'])
def query():
    prompt = """
    Could you list food spots with this criteria?
    {'location': 'New York', 'price': 'around 50 dollars', 'food': 'dinner', 'cuisine': 'Italian', 'other_details': 'good ambience'}
        
    Only return in this JSON format:
      {
        "name": "",
        "address": "",
        "distance": "",
        "price_range": "",
        "hours": {
          "monday": "",
          "tuesday": "",
          "wednesday": "",
          "thursday": "",
          "friday": "",
          "saturday": "",
          "sunday": ""
        }
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
    return json.dumps(data, indent=2)

if __name__ == '__main__':
    app.run(debug=True, port=4000)
    result = query()
