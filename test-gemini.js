const apiKey = process.env.OPENROUTER_API_KEY;

async function main() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Say hello in one sentence.",
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

main();