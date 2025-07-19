const { registerKey } = require("./apiKeys");

module.exports = (req, res) => {
  const data = registerKey();
  res.json(data);
};
