const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Response = require("../models/response");
const responseRouter = express.Router();

responseRouter.post("/fetchResponse", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.9,
        topP: 1,
      },
    });

    const result = await model.generateContent(
      prompt +
        ` Generate a short educational course strictly about the given prompt.If you think the prompt isn't related to education then ask to talk about only education and coding only, if it is not related to that then don't generate any course alright?, written the data in a such way that the user will find it interesting reading it with an external link which will explain in detail about that, don't format the response, don't try to make it bold or something alright?
`
    );

    const response = result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (err) {
    console.error("Error generating response:", err);
    res.status(500).json({
      error: err.message || "Failed to generate response",
    });
  }
});

module.exports = responseRouter;
