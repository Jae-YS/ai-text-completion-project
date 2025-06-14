from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import torch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PromptInput(BaseModel):
    label: str = ""
    prompt: str = ""
    temperature: float = 0.7
    max_new_tokens: int = 100
    top_p: float = 1.0


preset_prompts = {
    "Creative": {
        "prompt": "You are a storyteller from another galaxy. Write a short tale (150-200 words) about a planet where time flows backward and the citizens age in reverse. Describe how they live, love, and remember.",
    },
    "Informational": {
        "prompt": "Write a 2-paragraph summary of how renewable energy sources like wind and solar help reduce carbon emissions. Include a simple example of how solar panels work on a house.",
    },
    "Translation": {
        "prompt": "Translate the following English sentence into French, Spanish, and Japanese: 'The future of technology is shaped by curiosity, collaboration, and creativity.'",
    },
    "Factual": {
        "prompt": "What year was the World Wide Web introduced to the public, and who is credited with inventing it?",
    },
    "Technical": {
        "prompt": "You are a software engineer. Briefly explain how HTTP GET and POST methods differ, and give a real-world analogy comparing them to ordering food at a restaurant.",
    },
}


# Load model with pipeline (locally)
pipe = pipeline(
    "text-generation",
    model="bigscience/bloomz-560m",
    device=0 if torch.cuda.is_available() else -1,
    pad_token_id=50256,
    eos_token_id=50256,
)
print("Model ready.")


@app.post("/api/generate")
async def generate(data: PromptInput):
    prompt = (
        data.prompt.strip()
        if data.prompt.strip()
        else preset_prompts.get(data.label, "")
    )
    print(f"Prompt: {prompt}")

    if not prompt:
        return {"completion": "[Error] Prompt is empty."}

    try:
        output = pipe(
            prompt,
            temperature=data.temperature,
            max_new_tokens=data.max_new_tokens,
            top_p=data.top_p,
            do_sample=True,
            return_full_text=False,
        )
        return {"completion": output[0]["generated_text"]}
    except Exception as e:
        return {"completion": f"[Error] {str(e)}"}
