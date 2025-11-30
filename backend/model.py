import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

def ask_gemini(prompt):
    response = model.generate_content(prompt)
    return response.text

if __name__ == "__main__":
    user_input = input("Ask Gemini: ")
    answer = ask_gemini(user_input)
    print("\nGemini:", answer)