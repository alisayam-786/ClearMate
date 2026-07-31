const { GoogleGenAI } = require("@google/genai");

const apiKey = process.env.OPENROUTER_API_KEY;

const ai = new GoogleGenAI({
  apiKey,
});

async function main() {
  const models = await ai.models.list();

  for await (const model of models) {
    console.log(model.name);
  }
}

main().catch(console.error);