import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// Import Gemini API SDK (example: assuming Gemini provides a Node.js SDK)
import GeminiAPI from "gemini-api-sdk"; // replace with actual SDK if different

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini API client using environment variables
const gemini = new GeminiAPI({
  apiKey: process.env.GEMINI_API_KEY,
  apiSecret: process.env.GEMINI_API_SECRET,
});

// Test endpoint to check if keys are loaded
app.get("/test", (req, res) => {
  res.json({
    message: process.env.GEMINI_API_KEY ? "Gemini API Key loaded!" : "API Key missing",
  });
});

// AI Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Call Gemini API to get response
    // Replace this with actual Gemini API chat call
    const response = await gemini.generateText({
      prompt: message,
      maxTokens: 200, // adjust as needed
    });

    res.json({ reply: response.text }); // adjust based on Gemini API response structure
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
