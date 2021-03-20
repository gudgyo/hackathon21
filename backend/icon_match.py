import json
import spacy

def match_icon(text):
    icons = {
        "heart": ["heart", "chest pain", "palpitation"],
        "liver": ["liver", "icterus", "jaundice"],
        "intestine": ["intestine", "vomit", "diarrhea", "diarrhoea"],
        "brain": ["brain", "seizure", "dizziness", "vertigo"],
        "kidneys": ["kidneys", "polyuria", "anuria"],
        "pancreas": ["pancreas", "diabetes"],
        "uterus": ["uterus"],
        "stomach": ["stomach", "abdominal"],
        "ear": ["ear"],
        "nerve": ["nerve", "pain"],
        "joint": ["joint", "movement"],
        "eye": ["eye"],
        "arterie": ["arterie"],
        "muscle": ["muscle"],
        "virus": ["virus", "viral"],
        "bacteria": ["bacteria", "bacterium"],
        "lungs": ["lungs", "asphyxia", "dyspnea"],
        "bone": ["bone"],
        "cough": ["cough"],
    }
    results = []

    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    for token in doc:
        for key in icons.keys():
            if token.lemma_ in [i.lemma_ for i in nlp(" ".join(icons[key]))]:
                results.append(key)
    results = list(set(results))
    return results
