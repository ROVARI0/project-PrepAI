const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const ai = new GoogleGenAI({ apiKey: "AIzaSyCWVXFoyDsgLZSr5ooRo0if-w20QtJY7wg" });


// @desc    Generate interview questions and answers using Gemini
// @route   POST /api/ai/generate-questions
// @access  Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    // Validate required fields
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Build prompt
    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    // Call Gemini AI
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    // Clean it: Remove ```json and ``` from beginning and end
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // remove starting ```json
      .replace(/```$/, "")        // remove ending ```
      .trim();                    // remove extra spaces

    // Parse JSON safely
    const data = JSON.parse(cleanedText);

    // Return generated questions
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};


// @desc    Generate explains a interview question
// @route   POST /api/ai/generate-explanation
// @access  Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    // Validate required fields
    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Build prompt
    const prompt = conceptExplainPrompt(question);

    // Call Gemini AI
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    // Clean it: Remove ```json and ``` from beginning and end
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // remove starting ```json
      .replace(/```$/, "")        // remove ending ```
      .trim();                    // remove extra spaces

    // Parse JSON safely
    const data = JSON.parse(cleanedText);

    // Return explanation
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
