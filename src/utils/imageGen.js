async function generateImage(prompt) {
  try {
    if (!import.meta.env.VITE_HF_ACCESS_TOKEN) {
      throw new Error("API token not configured");
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_HF_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt, // Make sure the prompt is properly formatted
          options: {
            wait_for_model: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const result = await response.blob();
    return result;
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
}

export default generateImage;
