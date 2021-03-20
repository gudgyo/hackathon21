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
        "bacteria": ["bacteria"],
        "lungs": ["lungs", "asphyxia", "dyspnea"],
        "bone": ["bone"],
        "cough": ["cough"],
    }
    results = []

    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    for token in doc:
        for key in icons.keys():
            if token.lemma_ in icons[key] and token.lemma_:
                results.append(key)
    return json.dumps(list(set(results)))

print(match_icon("Anthrax is an infection caused by the bacterium Bacillus anthracis.[2] It can occur in four forms: skin, lungs, intestinal, and injection.[9] Symptom onset occurs between one day to over two months after the infection is contracted.[1] The skin form presents with a small blister with surrounding swelling that often turns into a painless ulcer with a black center.[1] The inhalation form presents with fever, chest pain, and shortness of breath.[1] The intestinal form presents with diarrhea which may contain blood, abdominal pains, nausea, and vomiting.[1] The injection form presents with fever and an abscess at the site of drug injection."))