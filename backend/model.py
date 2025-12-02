import subprocess
import google.generativeai as genai
from dotenv import load_dotenv
import os
import tempfile
import whisper

'''
.env required values:
gemini_api_key =
aws_access_key_id =
aws_secret_access_key =
'''

load_dotenv()

# gemini
genai.configure(api_key=os.getenv("gemini_api_key"))
gem_model = genai.GenerativeModel("gemini-2.5-flash")

def ask_gemini(prompt):
    ''' takes a user prompt and returns gemini answer '''
    response = gem_model.generate_content(prompt)
    return response.text

# whisper model for generating transcripts
# pip install git+https://github.com/openai/whisper.git
whisper_model = whisper.load_model("base")

def download_file(url, dst_path, chunk=1024 * 1024):
    import requests
    print("Downloading video...")
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(dst_path, 'wb') as f:
            for chunk_data in r.iter_content(chunk):
                if chunk_data:
                    f.write(chunk_data)
    print("Downloaded:", dst_path)


def extract_audio_ffmpeg(video_path, audio_path):
    print("Extracting audio using ffmpeg...")
    cmd = [
        "ffmpeg",
        "-i", video_path,
        "-vn",
        "-ar", "16000",
        "-ac", "1",
        "-f", "wav",
        audio_path,
        "-y"
    ]
    subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print("Audio saved to:", audio_path)


def transcribe_local(audio_path):
    print("Transcribing with Local Whisper...")
    result = whisper_model.transcribe(audio_path)
    return result["text"]


def transcribe_s3_video(s3_url):
    ''' takes an S3 URL and returns a transcript '''
    with tempfile.TemporaryDirectory() as tmp:
        video_path = os.path.join(tmp, "video.mp4")
        audio_path = os.path.join(tmp, "audio.wav")

        # download video
        download_file(s3_url, video_path)

        # extract audio
        extract_audio_ffmpeg(video_path, audio_path)

        # Scheck audio size
        size_mb = os.path.getsize(audio_path) / (1024 * 1024)
        if size_mb < 0.1:
            print("Warning: Audio file is extremely small. Check if the video has sound.")
            return ""

        # transcribe locally
        return transcribe_local(audio_path)

if __name__ == "__main__":
    s3_video_url = "https://studentanalyzer-bucket.s3.us-east-1.amazonaws.com/individual_project.mov"
    text = transcribe_s3_video(s3_video_url)
    print("\n=== TRANSCRIPT ===\n")
    print(text)