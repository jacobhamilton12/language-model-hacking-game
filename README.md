# language-model-hacking-game
Try to get the model to reveal the key. Strive to use the shortest prompt possible, anyone can make a massive prompt and trick the ai

How to run:
add your openai key to the env variable OPENAI_KEY (google how to do this on your OS)
open a terminal or cmd
```
python3 db.py # this initializes the dictionary
python3 app.py
```

TODO:
1. Successful submissions should be green.
2. Each prompt should be associated only with the submissions to that prompt. So going to a new prompt will clear the submissions box and only put the ones for that prompt if any.
3. Lock the next prompts on the backend until the user completes the current one.
4. User's cookies should keep track of the prompts they have completed.
5. Mobile friendly

Coding Style:

Keep files and functions small for AI to help with coding

Using openai api

Inspired by https://gpa.43z.one/
