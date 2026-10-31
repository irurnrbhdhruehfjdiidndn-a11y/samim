import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "ROHAN AI",
    status: "online",
    message: "ROHAN AI Server is running!"
  });
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Please send a message."
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(503).json({
        error: "AI service is not configured."
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "তুমি ROHAN AI। সব প্রশ্নের উত্তর সহজ, পরিষ্কার বাংলায় দেবে।"
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res.status(502).json({
        error: "AI service request failed."
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    res.json({
      reply: reply || "দুঃখিত, উত্তর পাওয়া যায়নি।"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`ROHAN AI running on port ${PORT}`);
});
