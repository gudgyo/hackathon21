import flask
from PIL import Image

from ocr import ocr

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route("/", methods=["GET"])
def home():
    return "Hello world!"


@app.route("/api/api-test")
def api_test():
    return "42"


@app.route("/api/upload-image", methods=["POST"])
def upload_image():
    file_content = flask.request.files["image"]
    image = Image.open(file_content)
    print(ocr(image))
    return ""


app.run()
