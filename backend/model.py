import tempfile
import subprocess
from pathlib import Path
import google.generativeai as genai
from dotenv import load_dotenv
import requests
import os

load_dotenv()

# gemini
genai.configure(api_key=os.getenv("gemini_api_key"))
model = genai.GenerativeModel("gemini-2.5-flash")

def ask_gemini(prompt):
    # in main:
    # user_input = input("Ask Gemini: ")
    # answer = ask_gemini(user_input)
    # print("\nGemini:", answer)
    response = model.generate_content(prompt)
    return response.text