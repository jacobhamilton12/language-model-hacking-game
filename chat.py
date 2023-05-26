import openai
import os

def openai_chat(user_entry, system_prompt, key):
    message_log = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"new user: {user_entry}"}
    ]
    openai.api_key = os.getenv("OPENAI_KEY")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # The name of the OpenAI chatbot model to use
        messages=message_log,
        max_tokens=2000,        # The maximum number of tokens (words or subwords) in the generated response
        temperature=0.5,        # The "creativity" of the generated response (higher temperature = more creative)
    )
    response_content = response.choices[0].message.content
    key_in_response = key in response_content
    return response_content, key_in_response