const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body);
    console.log("making post request");
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: response.data.choices[0].message.content.trim(),
      }),
    };
  } catch (error) {
    console.error("Error sending message", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to connect to API" }),
    };
  }
};
