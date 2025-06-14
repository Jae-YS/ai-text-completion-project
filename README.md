# Text Completion App (Hugging Face + FastAPI + React)

This is a generative AI web application that accepts either a predefined or custom prompt and returns a completed response using Hugging Face’s `bigscience/bloomz-560m` model. The backend uses FastAPI, and the frontend is built in React with Axios.

---

## Features

- Local text generation using Hugging Face Transformers and `bloomz-560m`
- Prompt selection via buttons (Creative, Informational, etc.)
- Custom prompt input with editable parameters
- Fully integrated React + FastAPI application
- Adjustable generation parameters: temperature, max tokens, top_p

---

## Project Structure

```
text-completion-app/
│
├── backend/
│   ├── main.py              # FastAPI backend with model inference
│   ├── .env                 # Optional: Hugging Face token if needed
│   └── requirements.txt     # Python backend dependencies
│
├── frontend/
│   ├── src/
│   │   └── TextCompletionApp.tsx  # React frontend component
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## Getting Started

### 1. Clone the Project

```bash
git clone https://github.com/your-username/text-completion-app.git
cd text-completion-app
```

---

### 2. Backend Setup

#### a. Install Python dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### b. Run FastAPI

```bash
uvicorn main:app --reload
```

Backend will run at `http://localhost:8000`.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`.

---

## Prompt Options

You can:

- Select from 5 preset prompt buttons:
  - Creative
  - Informational
  - Instructional
  - Factual
  - Technical
- Or type your own prompt manually.

---

## Parameter Controls

- **Temperature** – Controls randomness (0 = deterministic, 1 = creative)
- **Max Tokens** – Limits length of output
- **Top P** – Controls diversity via nucleus sampling

---

## Troubleshooting

- Model slow or empty? Increase `max_new_tokens`.
- Errors? Check FastAPI console for trace logs.
- Cannot connect? Make sure both frontend (`5173`) and backend (`8000`) are running.

---

## Dependencies

**Backend**:

- `fastapi`
- `uvicorn`
- `transformers`
- `torch`
- `python-dotenv` (if using HF_TOKEN)

**Frontend**:

- `react`
- `axios`
- `vite`

---
