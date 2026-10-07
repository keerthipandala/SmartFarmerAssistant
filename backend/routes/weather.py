import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("WEATHER_API_KEY")

def get_weather(city):

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={API_KEY}&units=metric"
    )

    response = requests.get(url)

    data = response.json()

    print(data)

    return {
        "city": city,
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "condition": data["weather"][0]["main"]
    }