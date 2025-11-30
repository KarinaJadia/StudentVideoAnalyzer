import time
import google.generativeai as genai
from dotenv import load_dotenv
import requests
import os

load_dotenv()

genai.configure(api_key=os.getenv("gemini_api_key"))
model = genai.GenerativeModel("gemini-2.5-flash")

def ask_gemini(prompt):
    response = model.generate_content(prompt)
    return response.text

def transcribe(video_url):
    # Download S3 file
    data = requests.get(video_url).content
    with open("temp.mov", "wb") as f:
        f.write(data)

    # Upload to Gemini
    uploaded = genai.upload_file("temp.mov")

    # Ask for transcript
    response = model.generate_content([
        uploaded,
        "Generate a transcript for this video."
    ])

    print(response.text)

if __name__ == "__main__":
    # user_input = input("Ask Gemini: ")
    # answer = ask_gemini(user_input)
    # print("\nGemini:", answer)

    transcribe("https://studentanalyzer-bucket.s3.us-east-1.amazonaws.com/videos/292ebe72-f753-4a83-acf3-3e7b562965c1.MOV")