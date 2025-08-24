import { useState } from "react";
import axios from "axios";

const mentors = {
  1: {
    name: "Hitesh Sir",
    avatar: "https://avatars.githubusercontent.com/u/11613311?v=4", // Hitesh Sir avatar
  },
  2: {
    name: "Piyush Sir",
    avatar:
      "https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Favatar.png&w=640&q=75", // Piyush Sir avatar
  },
};

function Home() {
  const [mentor, setMentor] = useState("1");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
const API_URL = import.meta.env.VITE_API_URL;

const handleAsk = async () => {
  if (!question.trim()) return;

  setLoading(true);
  setResponse("");
  try {
    const res = await axios.post(`${API_URL}/api/ask`, {
      mentor,
      question,
    });

    if (res.data?.reply) {
      setResponse(res.data.reply);
    } else {
      setResponse("⚠️ Unexpected response format from server.");
    }

    setQuestion("");
  } catch (err) {
    console.error("API Error:", err);

    if (err.response) {
      setResponse(`❌ Server Error: ${err.response.status} - ${err.response.statusText}`);
    } else if (err.request) {
      setResponse("🌐 No response from server. Please check backend.");
    } else {
      setResponse(`⚠️ Error: ${err.message}`);
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 bg-base-100 shadow-xl rounded-xl border border-base-300 mt-10">
      <h1 className="text-3xl font-bold text-center mb-2">Persona AI</h1>

      {/* Mentor Selection */}
      <div className="form-control">
        <label className="label font-semibold">Select Mentor</label>
        <select
          className="select select-bordered ml-5"
          value={mentor}
          onChange={(e) => setMentor(e.target.value)}
        >
          <option value="1">Hitesh Sir</option>
          <option value="2">Piyush Sir</option>
        </select>
      </div>

      {/* Mentor Display */}
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={mentors[mentor].avatar} alt="Mentor" />
          </div>
        </div>
        <span className="text-lg font-semibold">{mentors[mentor].name}</span>
      </div>

      {/* Ask Question */}
      <div className="form-control">
        <label className="label font-semibold">Ask Questions</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="input input-bordered flex-grow"
            placeholder="Ask your tech question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={handleAsk}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>

      {/* Response */}
      {response && (
        <div className="bg-base-200 p-4 rounded-xl">
          <h2 className="font-bold mb-1">Response</h2>
          <p className="whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
