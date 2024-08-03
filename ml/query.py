from flask import Flask, jsonify
import modal

app = Flask(__name__)

# Initialize Modal
modal_app = modal.App()
llama_function = modal.Function.lookup("example-tgi-Meta-Llama-3-70B-Instruct", "Model.generate")

@app.route('/query', methods=['GET'])
def query():
    prompt = """
    Could you list food spots near 95111 that fits this criteria?
        Food: Pho
        Cuisine: Vietnamese
        Price Range: '$'
        
    In this JSON format:
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
    
    # jsons the response
    food_spots = result

    return jsonify(food_spots)

if __name__ == '__main__':
    app.run(debug=True, port=4000)
    query()
