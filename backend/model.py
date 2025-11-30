import tempfile
import subprocess
from pathlib import Path
import google.generativeai as genai
from dotenv import load_dotenv
import requests
import os
from faster_whisper import WhisperModel

load_dotenv()

# gemini
genai.configure(api_key=os.getenv("gemini_api_key"))
model = genai.GenerativeModel("gemini-2.5-flash")

# whisper
MODEL_SIZE = "medium"  # small, base, medium, large
LANGUAGE = "en"

def ask_gemini(prompt):
    # in main:
    # user_input = input("Ask Gemini: ")
    # answer = ask_gemini(user_input)
    # print("\nGemini:", answer)
    response = model.generate_content(prompt)
    return response.text

def stream_s3_video_to_audio(s3_url: str) -> str:
    """
    Streams a video from S3 and converts it to a temporary WAV audio file.
    Returns the path to the WAV file.
    """
    tmp_audio_file = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    tmp_audio_file.close()  # will be written by ffmpeg

    # ffmpeg command to read from pipe and write WAV audio
    ffmpeg_cmd = [
        "ffmpeg",
        "-i", "pipe:0",          # input from stdin
        "-vn",                   # no video
        "-acodec", "pcm_s16le",  # PCM 16-bit
        "-ar", "16000",          # 16kHz sample rate
        "-ac", "1",              # mono
        tmp_audio_file.name
    ]

    print("Streaming video from S3 and converting to audio...")

    with requests.get(s3_url, stream=True) as r:
        r.raise_for_status()
        process = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)
        for chunk in r.iter_content(chunk_size=8192):
            process.stdin.write(chunk)
        process.stdin.close()
        process.wait()

    print(f"Audio saved to {tmp_audio_file.name}")
    return tmp_audio_file.name

def transcribe_audio(audio_path: str) -> str:
    """
    Transcribes the audio file using faster-whisper.
    """
    print(f"Loading Whisper model ({MODEL_SIZE})...")
    model = WhisperModel(MODEL_SIZE)

    print("Transcribing audio...")
    segments, info = model.transcribe(audio_path, language=LANGUAGE, beam_size=5)

    transcript = ""
    for segment in segments:
        transcript += segment.text + " "

    return transcript.strip()

# ------------------------------
# MAIN PIPELINE
# ------------------------------
if __name__ == "__main__":
    s3_video_url = "https://studentanalyzer-bucket.s3.us-east-1.amazonaws.com/videos/292ebe72-f753-4a83-acf3-3e7b562965c1.MOV"

    # Step 1: Stream video and convert to audio
    audio_path = stream_s3_video_to_audio(s3_video_url)

    # Step 2: Transcribe
    transcript = transcribe_audio(audio_path)

    print("\n=== FULL TRANSCRIPT ===\n")
    print(transcript)