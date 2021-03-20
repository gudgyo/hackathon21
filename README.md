# hackathon21

Team name: Trading Xbox for PS5

Link to event: https://tech.eu/event/start-hack-2021-online/

## Prerequisites

- Anaconda/Miniconda
- Yarn/npm (use appropriate command below)

## Install

```bash
conda create -n hackathon21 python=3.8
conda activate hackathon21
pip install -r requirements.txt
conda install -c conda-forge tesseract
python -m spacy download en_core_web_sm

cd frontend
yarn install
```

## Run

```bash
conda activate hackathon21
python backend/server.py

cd frontend
yarn start
```

# Tasks

- [ ] Collect sample diagnostics sheets (1-2 for different languages, maybe?)
- [ ] OCR text form diagnostics page

# Resources used

- https://www.flaticon.com/free-icon/take-a-picture_3460771