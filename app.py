from flask import Flask, render_template, request, jsonify

from chat import openai_chat
from db_manager import store_submission, get_submissions
from prompts import prompts

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
    user_entry, system_prompt = request.form.get('entry'), request.form.get('prompt')
    system_prompt = system_prompt.replace('█' * 6, KEY)
    if not user_entry or not system_prompt:
        return {"error": "Invalid input"}, 400
    response_content, key_in_response = openai_chat(user_entry, system_prompt, KEY)
    if key_in_response:
        store_submission(user_entry)
    return jsonify({"response": response_content, "keyInResponse": key_in_response})

@app.route('/submissions', methods=['GET'])
def submissions():
    submissions = get_submissions()
    return jsonify(submissions)

if __name__ == '__main__':
    app.run(debug=True)