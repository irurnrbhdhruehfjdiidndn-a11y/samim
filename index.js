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

    return res.status(501).json({
      error: "AI connection is not configured yet."
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
  console.log(`ROHAN AI server running on port ${PORT}`);
});
