import json
import re

import flask
from PIL import Image

from give_data import return_data
from microsoft_ocr import recognize_text
from pil2datauri import pil2datauri

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route("/api/upload-image", methods=["POST"])
def upload_image():
    file_content = flask.request.files["image"]
    image = Image.open(file_content)

    print(image.width, image.height)

    image = image.resize((int(image.width / 4), int(image.height / 4)))

    image_2 = image.copy()
    text, data = recognize_text(image)

    data_uri = pil2datauri(image_2)

    guess = guess_icd(data) or 0

    return json.dumps(dict(text=text, data=data, data_uri=data_uri, guess=guess))


@app.route("/api/enter-icd", methods=["POST"])
def enter_icd():
    icd = flask.request.values["text"]
    icd = icd.strip().replace("O", "0")
    return show_results(icd)


def guess_icd(data):
    i = 0
    for item in data["regions"]:
        for line in item["lines"]:
            for word in line["words"]:
                text: str = word["text"]
                if re.match(r"[A-Z]\d\d\.?\d{0,4}", text.strip().replace("O", "0")):
                    return i
                i += 1


def get_icd_from_text(text: str) -> str:
    return (
        re.search(r"[A-Z]\d\d\.?\d{0,4}", text.replace("O", "0"))
        .group(0)
        .replace(".", "")
    )


def show_results(icd: str) -> str:
    return json.dumps(return_data(icd))


app.run()
