import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `You are a multilingual cultural translator designed for travelers. Your responsibilities include:
- Translating phrases or expressions accurately and literally into the requested language.
- Providing cultural or contextual meaning and offering commonly used equivalents if available.
- Clearly explaining nuances, origins, or deeper meanings when applicable.
- Mentioning if a phrase has literary, historical, or cultural significance.
- If unsure, stating that you are not certain instead of making assumptions.
- Responding in the same language as the input and using Markdown formatting for clarity and readability.
`;

// the Hugging Face API Key
const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function culturaltranslatorMistral(userQuery) {
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${userQuery}. Please translate it for me!`,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error(err.message);
  }
}
