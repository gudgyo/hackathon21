import json
import re

import flask
from PIL import Image

from ocr import ocr

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route("/api/upload-image", methods=["POST"])
def upload_image():
    file_content = flask.request.files["image"]
    image = Image.open(file_content)
    text = ocr(image)
    print(text)

    icd = get_icd_from_text(text)

    return show_results(icd)


def get_icd_from_text(text: str) -> str:
    return re.match(r"[A-Z]\d\d\.?\d?\d?", text).group(0).replace(".", "")


def show_results(icd: str) -> str:
    return json.dumps([])


@app.route("/api/test-results")
def test_results():
    example_icd = "A065"
    return show_results(example_icd)


app.run()
