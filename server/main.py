from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chat import ask_your_mentor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://persona-ai-git-main-rohit-vishwakarmas-projects-95176ae8.vercel.app","https://persona-ai-tau.vercel.app"],  # Adjust this for your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MentorQuery(BaseModel):
    mentor: str
    question: str


@app.get("/")
async def ask_question():
    return {"status": 200, "response :": "Server is running..."}

@app.post("/api/ask")
async def ask_question(query: MentorQuery):
    response = ask_your_mentor(query.mentor, query.question)
    return {"reply": response}
