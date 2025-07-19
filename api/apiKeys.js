let keys = {};

function generateKey(length = 40) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < length; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}

function registerKey() {
  const key = generateKey();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  keys[key] = { expiresAt, uses: 0 };
  console.log(`[KEYGEN] Generated key: ${key} expires at ${new Date(expiresAt).toISOString()}`);
  return { key, expiresAt };
}

function isValidKey(key) {
  const data = keys[key];
  if (!data) return false;
  if (Date.now() > data.expiresAt) {
    delete keys[key];
    return false;
  }
  if (data.uses >= 100) {
    delete keys[key];
    return false;
  }
  data.uses++;
  return true;
}

module.exports = { registerKey, isValidKey };
