import flask

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route("/", methods=["GET"])
def home():
    return "Hello world!"


@app.route("/api/api-test")
def api_test():
    return "42"


app.run()
