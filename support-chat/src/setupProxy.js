const { createProxyMiddleware } = require("http-proxy-middleware");

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
        Authorization: `Bearer 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`,
      },
    })
  );
};
