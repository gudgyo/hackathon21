import base64
from io import BytesIO


def pil2datauri(img):
    data = BytesIO()
    img.save(data, "PNG")
    data64 = base64.b64encode(data.getvalue())
    return u"data:img/jpeg;base64," + data64.decode("utf-8")
