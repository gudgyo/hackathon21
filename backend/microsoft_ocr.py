# import models
import os
import time

from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from dotenv import find_dotenv, load_dotenv
from msrest.authentication import CognitiveServicesCredentials

if __name__ == "__main__":
    load_dotenv(find_dotenv())

    region = os.environ["ACCOUNT_REGION"]
    key = os.environ["ACCOUNT_KEY"]

    credentials = CognitiveServicesCredentials(key)
    client = ComputerVisionClient(
        endpoint="https://" + region + ".api.cognitive.microsoft.com/",
        credentials=credentials,
    )

    url = "https://github.com/Azure-Samples/cognitive-services-python-sdk-samples/raw/master/samples/vision/images/make_things_happen.jpg"
    raw = True
    numberOfCharsInOperationId = 36

    # SDK call
    rawHttpResponse = client.read(url, language="en", raw=True)

    # Get ID from returned headers
    operationLocation = rawHttpResponse.headers["Operation-Location"]
    idLocation = len(operationLocation) - numberOfCharsInOperationId
    operationId = operationLocation[idLocation:]

    # SDK call
    result = client.get_read_result(operationId)

    while result.status == OperationStatusCodes.running:
        time.sleep(10)
        result = client.get_read_result(operationId)

    # Get data
    if result.status == OperationStatusCodes.succeeded:

        for line in result.analyze_result.read_results[0].lines:
            print(line.text)
            print(line.bounding_box)

    else:
        print(result)
