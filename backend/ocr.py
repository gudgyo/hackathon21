import pytesseract
from PIL import Image


def ocr(image: Image) -> str:
    return pytesseract.image_to_string(image)


if __name__ == "__main__":
    img = Image.open(
        "../data/sample-inputs/cardiology-icd10-records-with-dual-codingicd10-training-1-638.jpg"
    )
    print(ocr(img))
