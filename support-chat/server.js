const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/gpt3", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      }
    );
    res.json(response.data.choices[0].message.content.trim());
  } catch (error) {
    console.error("Error sending message", error);
    res.status(500).json({ error: "Unable to connect toAPI" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
