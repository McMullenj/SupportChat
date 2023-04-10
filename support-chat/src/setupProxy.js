const { createProxyMiddleware } = require("http-proxy-middleware");
//const config = require("./config.json");
module.exports = function (app) {
  app.use(
    "/api/gpt3",
    createProxyMiddleware({
      target: "https://api.openai.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api/gpt3": "/v1/chat/completions",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`, //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`,
      },
    })
  );
};
