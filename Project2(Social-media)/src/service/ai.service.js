const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {  // this is called abstration -> process of hiding complex implementation details and showing only the necessary part of an function to the developer.
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config:{
      systemInstruction: `You are expert in generating captions for images. You generate single caption for an image. Your caption should be short and concise. You use hashtags and emojis in the caption.`
      // you can guide the ai what to do
    }
  });
  return response.text;
}

module.exports = generateCaption
