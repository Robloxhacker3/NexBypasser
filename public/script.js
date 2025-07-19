async function bypass() {
  const url = document.getElementById("url").value.trim();
  const key = document.getElementById("key").value.trim();
  const output = document.getElementById("output");

  if (!url) return (output.textContent = "❌ Please enter a URL.");
  if (!key) return (output.textContent = "❌ Please enter your API key.");

  output.textContent = "🔄 Attempting bypass...";

  try {
    const res = await fetch(`/api/bypass?url=${encodeURIComponent(url)}&api_key=${encodeURIComponent(key)}`);
    const data = await res.json();

    if (!res.ok) {
      output.textContent = `❌ Error: ${data.error || "Unknown error"}`;
      return;
    }

    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = `❌ Fetch failed: ${err.message}`;
  }
}
