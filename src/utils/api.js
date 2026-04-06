import { ROLES } from "../config/roles";

export async function callClaude(role, userMessage) {
  const config = ROLES[role];
  const apiKey = localStorage.getItem("ac_key");

  if (!apiKey) {
    throw new Error("API anahtarı bulunamadı.");
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 1024,
      system: config.systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.content?.map((b) => b.text || "").join("\n") || "Yanıt alınamadı.";
}
