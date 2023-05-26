from flask import Flask, render_template, request, jsonify
import openai
import os

from db_manager import store_submission, get_submissions
from prompts import prompts

key = os.getenv("OPENAI_KEY")
print(key)
openai.api_key = key

app = Flask(__name__)
KEY = 'asdkfl'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/prompts', methods=['GET'])
def get_prompts():
    # Replace the key in the prompts with the block character
    sanitized_prompts = [prompt.replace('asdkfl', '█' * 6) for prompt in prompts]
    return jsonify(sanitized_prompts)

@app.route('/submit', methods=['POST'])
def submit_entry():
    user_entry = request.form.get('entry')
    system_prompt = request.form.get('prompt')
    # Replace the block characters with the key
    system_prompt = system_prompt.replace('█' * 6, KEY)

    if not user_entry or not system_prompt:
        return jsonify({"error": "Invalid input"}), 400

    message_log = message_log = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"new user: {user_entry}"}
    ]
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # The name of the OpenAI chatbot model to use
        messages=message_log,   # The conversation history up to this point, as a list of dictionaries
        max_tokens=2000,        # The maximum number of tokens (words or subwords) in the generated response
        stop=None,              # The stopping sequence for the generated response, if any (not used here)
        temperature=0.5,        # The "creativity" of the generated response (higher temperature = more creative)
    )
    response_content = response.choices[0].message.content
    key_in_response = KEY in response_content
    if key_in_response:
        store_submission(user_entry)

    return jsonify({"response": response_content, "keyInResponse": key_in_response})

@app.route('/submissions', methods=['GET'])
def submissions():
    submissions = get_submissions()
    return jsonify(submissions)

if __name__ == '__main__':
    app.run(debug=True)
