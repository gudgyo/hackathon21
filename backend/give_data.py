import pandas as pd
from icon_match import match_icon
import json
import re

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
        "definition": row['definition'].values[0],
        "causes": re.sub('[^A-Za-z0-9]+', '', row['causes'].values[0]),
        "disease": row['disease'].values[0].lstrip(),
        "duration": row['duration'].values[0],
        "frequency": row['frequency'].values[0],
        "icd": icd,
        "prevention": row['prevention'].values[0],
        "prognosis": row['prognosis'].values[0],
        "risks": re.sub('[^A-Za-z0-9]+', '', row['risks'].values[0]),
        "symptoms": row['symptoms'].values[0],
        "treatment": row['treatment'].values[0],
    }
    return data