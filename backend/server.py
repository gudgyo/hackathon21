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
    image_2 = image.copy()
    text, data = recognize_text(image)
    print(text)

    icd = get_icd_from_text(text)

    return show_results(icd)

    data_uri = pil2datauri(image_2)

    return json.dumps(dict(text=text, data=data, data_uri=data_uri, guess=0))


@app.route("/api/enter-icd", methods=["POST"])
def enter_icd():
    icd = flask.request.values["text"]
    return show_results(icd)


def get_icd_from_text(text: str) -> str:
    return (
        re.search(r"[A-Z]\d\d\.?\d{0,4}", text.replace("O", "0"))
        .group(0)
        .replace(".", "")
    )


def show_results(icd: str) -> str:
    return json.dumps(return_data(icd))


@app.route("/api/test-results")
def test_results():
    example_icd = "A065"
    return show_results(example_icd)


app.run()
