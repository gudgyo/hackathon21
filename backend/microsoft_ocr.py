# import models
import os
from io import BytesIO
from pprint import pprint

import requests
from PIL import Image
from dotenv import find_dotenv, load_dotenv


# https://www.speeckaert.io/blog/articles/using-microsoft-cognitive-services-to-perform-ocr-on-images.html
def recognize_text(img: Image):
    load_dotenv(find_dotenv())

    region = os.environ["ACCOUNT_REGION"]
    key = os.environ["ACCOUNT_KEY"]

    api_url = f"https://{region}.api.cognitive.microsoft.com/vision/v2.0/ocr"

    header = {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/octet-stream",
    }

    params = {"language": "unk"}

    # Ensure the image is at least 40x40
    if min(img.size) < 40:
        img = img.crop((0, 0, max(img.size[0], 40), max(img.size[1], 40)))

    bin_img = BytesIO()
    img.save(bin_img, format="PNG")
    img.close()

    img_data = bin_img.getvalue()
    bin_img.close()

    r = requests.post(api_url, params=params, headers=header, data=img_data)

    r.raise_for_status()

    data = r.json()

    pprint(data)

    text = ""
    for item in r.json()["regions"]:
        for line in item["lines"]:
            for word in line["words"]:
                text += " " + word["text"]
            text += "\n"
    print(text)

    return text, data


if __name__ == "__main__":
    img = Image.open("../data/sample-inputs/sample.png")
    recognize_text(img)
