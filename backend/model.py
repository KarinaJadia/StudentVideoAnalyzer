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
    data = requests.get(video_url).content
    with open("temp.mov", "wb") as f:
        f.write(data)

    uploaded = genai.upload_file("temp.mov")

    response = model.generate_content([
        uploaded,
        "Generate a transcript for this video."
    ])

    print(response.text)

def download_video(video_url, local_path="temp_video"):
    response = requests.get(video_url, stream=True)
    ext = os.path.splitext(video_url)[-1]
    full_path = f"{local_path}{ext}"
    with open(full_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)
    return full_path, ext

def upload_video(local_path, mime_type="video/mp4"):
    """Upload local video file to Gemini."""
    file = genai.upload_file(path=local_path, mime_type=mime_type)
    return file

def wait_for_file_active(file_name, timeout=120):
    """Poll until the uploaded file becomes ACTIVE."""
    start_time = time.time()
    while time.time() - start_time < timeout:
        file = genai.get_file(file_name)
        if file.state == "ACTIVE":
            return file
        elif file.state == "FAILED":
            raise RuntimeError("File processing failed in Gemini")
        time.sleep(2)
    raise TimeoutError("File never became ACTIVE")

def transcribe_video(file):
    contents = [
        {
            "role": "user",
            "parts": [
                {
                    "file_data": {
                        "file_uri": file.uri,
                        "mime_type": file.mime_type
                    }
                },
                {
                    "text": "Please generate a transcript of this video."
                }
            ]
        }
    ]
    response = model.generate_content(contents)
    return response.text

if __name__ == "__main__":
    # user_input = input("Ask Gemini: ")
    # answer = ask_gemini(user_input)
    # print("\nGemini:", answer)

    video_url = "https://studentanalyzer-bucket.s3.us-east-1.amazonaws.com/videos/292ebe72-f753-4a83-acf3-3e7b562965c1.MOV"

    print("Downloading video locally...")
    local_path, ext = download_video(video_url)
    mime_type = "video/quicktime" if ext.lower() == ".mov" else "video/mp4"

    print("Uploading video to Gemini...")
    uploaded_file = upload_video(local_path, mime_type=mime_type)

    print("Waiting for file to become ACTIVE...")
    active_file = wait_for_file_active(uploaded_file.name)  # <-- use .name

    print("Generating transcript...")
    transcript = transcribe_video(active_file)

    print("\n=== Transcript ===\n")
    print(transcript)