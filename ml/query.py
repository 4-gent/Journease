from flask import Flask
import modal
import json
import openai
import re

openai.api_key = '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'
def format_query(user_input):
    prompt = f"""
    Extract the following details from the user's input:
    - Location
    - Price
    - Food
    - Cuisine
    - Any other details

    User input: "{user_input}"
    
    Output dict with keys: location, price, food, cuisine, other_details.
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ]
    )

    # Extracting the text response
    response_text = response['choices'][0]['message']['content'].strip()

    try:
        # Convert the response text to a dictionary
        extracted_details = json.loads(response_text)
        return "\n".join(f"{key}: {value}" for key, value in extracted_details.items())
    except json.JSONDecodeError:
        return user_input

app = Flask(__name__)

# Initialize Modal
modal_app = modal.App()
llama_function = modal.Function.lookup("example-tgi-Meta-Llama-3-70B-Instruct", "Model.generate")

@app.route('/query', methods=['GET'])
def query():
    prompt = "Could you list food spots that fits this criteria?" +\
    format_query("I'm looking for an Mexican restaurants near 95111 that serve Tacos.") +\
    """ 
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
