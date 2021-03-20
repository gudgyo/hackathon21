import pandas as pd
from icon_match import match_icon
import json

df = pd.read_pickle("backend/diseases2.pkl")

def return_data(icd):
    row = df.loc[df['icd'] == icd]

    if icd[0] == "A" or icd[0] == "B":
        disease_icon = "infection"
    elif icd[0] == "C":
        disease_icon = "cancer"
    elif icd[0] == "D":
        disease_icon = "blood"
    elif icd[0] == "E":
        disease_icon = "endocrine"
    elif icd[0] == "F":
        disease_icon = "mental"
    elif icd[0] == "G":
        disease_icon = "neural"
    elif icd[0] == "H":
        disease_icon = "ear_eye"
    elif icd[0] == "I":
        disease_icon = "circulation"
    elif icd[0] == "J":
        disease_icon = "lung"
    else:
        disease_icon = ""


    data = {
        "disease_icon": disease_icon,
        "iconlist": match_icon(row['definition'].values[0]),
        "definition": " ".join(row['definition'].to_string().split(" ", 1)[1].split()),
        "causes": " ".join(row['causes'].to_string().split(" ", 1)[1].split()),
        "disease": " ".join(row['disease'].to_string().split(" ", 1)[1].split()),
        "duration": " ".join(row['duration'].to_string().split(" ", 1)[1].split()),
        "frequency": " ".join(row['frequency'].to_string().split(" ", 1)[1].split()),
        "icd": icd,
        "prevention": " ".join(row['prevention'].to_string().split(" ", 1)[1].split()),
        "prognosis": " ".join(row['prognosis'].to_string().split(" ", 1)[1].split()),
        "risks": " ".join(row['risks'].to_string().split(" ", 1)[1].split()),
        "symptoms": " ".join(row['symptoms'].to_string().split(" ", 1)[1].split()),
        "treatment": " ".join(row['treatment'].to_string().split(" ", 1)[1].split()),
    }
    return data
