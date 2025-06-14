import React, { useState } from "react";
import axios from "axios";

const presetPrompts = [
  {
    label: "Creative",
    prompt:
      "You are a storyteller from another galaxy. Write a short tale (150-200 words) about a planet where time flows backward and the citizens age in reverse. Describe how they live, love, and remember.",
    temperature: 0.9,
    maxTokens: 120,
    topP: 1.0,
  },
  {
    label: "Informational",
    prompt:
      "Write a 2-paragraph summary of how renewable energy sources like wind and solar help reduce carbon emissions. Include a simple example of how solar panels work on a house.",
    temperature: 0.6,
    maxTokens: 180,
    topP: 0.8,
  },
  {
    label: "Translational ",
    prompt:
      "Translate the following English sentence into French, Spanish, and Japanese: 'The future of technology is shaped by curiosity, collaboration, and creativity.'",
    temperature: 0.5,
    maxTokens: 160,
    topP: 0.9,
  },
  {
    label: "Factual",
    prompt:
      "What year was the World Wide Web introduced to the public, and who is credited with inventing it?",
    temperature: 0.4,
    maxTokens: 140,
    topP: 0.7,
  },
  {
    label: "Technical",
    prompt:
      "You are a software engineer. Briefly explain how HTTP GET and POST methods differ, and give a real-world analogy comparing them to ordering food at a restaurant.",
    temperature: 0.6,
    maxTokens: 220,
    topP: 0.9,
  },
];

const TextCompletionApp = () => {
  const [label, setLabel] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(200);
  const [topP, setTopP] = useState(1.0);
  const [hoveredPrompt, setHoveredPrompt] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label && !prompt.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("/api/generate", {
        label,
        prompt,
        temperature,
        max_new_tokens: maxTokens,
        top_p: topP,
      });
      setResponse(res.data.completion);
    } catch (err: any) {
      setResponse(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxWidth: 700,
        margin: "auto",
      }}
    >
      <h2>Text Completion App (Hugging Face)</h2>
      <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
        Hover over a button to preview its prompt.
      </p>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {presetPrompts.map((item) => (
          <div
            key={item.label}
            style={{ position: "relative" }}
            onMouseEnter={() => setHoveredPrompt(item.prompt)}
            onMouseLeave={() => setHoveredPrompt(null)}
          >
            <button
              onClick={() => {
                setLabel(item.label);
                setPrompt(item.prompt);
                setTemperature(item.temperature);
                setMaxTokens(item.maxTokens);
                setTopP(item.topP);
              }}
              style={{
                padding: "0.5rem",
                cursor: "pointer",
                background: label === item.label ? "#ddd" : undefined,
              }}
            >
              {item.label}
            </button>
            {hoveredPrompt === item.prompt && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: 300,
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "0.5rem",
                  fontSize: "0.85rem",
                  zIndex: 10,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                {item.prompt}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here or choose a preset above..."
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <label>
            Temperature:
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
            />
          </label>
          <label>
            Max Tokens:
            <input
              type="number"
              min="1"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
            />
          </label>
          <label>
            Top P:
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={topP}
              onChange={(e) => setTopP(Number(e.target.value))}
            />
          </label>
        </div>

        <button type="submit" disabled={loading || (!label && !prompt.trim())}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {response && (
        <div
          style={{
            marginTop: "2rem",
            background: "#f4f4f4",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h4>Response:</h4>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {response}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TextCompletionApp;
