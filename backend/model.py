from dotenv import load_dotenv
import os

load_dotenv()

print(os.getenv("aws_access_key_id"))