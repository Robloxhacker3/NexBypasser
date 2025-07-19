const axios = require("axios");
const { isValidKey } = require("./apiKeys");

module.exports = async (req, res) => {
  const { url, api_key } = req.query;
  if (!url || !api_key) return res.status(400).json({ error: "Missing url or api_key" });
  if (!isValidKey(api_key)) return res.status(403).json({ error: "Invalid or expired API key" });

  await new Promise((r) => setTimeout(r, Math.random() * 2000 + 500));

  try {
    const headers = {
      "User-Agent": "Mozilla/5.0",
      Referer: "https://google.com",
      DNT: "1",
    };

    const response = await axios.get(url, {
      headers,
      timeout: 10000,
      maxRedirects: 5,
    });

    const title = response.data.match(/<title>(.*?)<\/title>/i)?.[1] || "Unknown";

    res.json({
      success: true,
      requested: url,
      resolved: response.request.res.responseUrl,
      title,
      contentSize: Buffer.byteLength(response.data),
    });
  } catch (err) {
    res.status(500).json({ error: "Bypass failed", details: err.message });
  }
};
