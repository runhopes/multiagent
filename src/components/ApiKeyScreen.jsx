import { useState } from "react";

export default function ApiKeyScreen({ onSave }) {
  const [key, setKey] = useState("");

  function handleSave() {
    if (!key.trim()) return;
    localStorage.setItem("ac_key", key.trim());
    onSave();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 380,
          width: "100%",
          background: "#fff",
          borderRadius: 12,
          padding: 32,
          border: "1px solid #e5e5e5",
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#171717",
            marginBottom: 6,
          }}
        >
          agent chain
        </h2>
        <p
          style={{
            color: "#737373",
            fontSize: 13,
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          Anthropic API anahtarınızı girin. Anahtar sadece tarayıcınızda
          saklanır.
        </p>

        <label
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#525252",
            marginBottom: 6,
            display: "block",
          }}
        >
          API Key
        </label>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="sk-ant-api03-..."
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 6,
            border: "1px solid #e5e5e5",
            background: "#fafafa",
            color: "#171717",
            fontSize: 13,
            fontFamily: "monospace",
            marginBottom: 16,
          }}
        />
        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 6,
            border: "none",
            background: "#171717",
            color: "#fff",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Devam et
        </button>
        <p
          style={{
            marginTop: 14,
            color: "#a3a3a3",
            fontSize: 11,
            textAlign: "center",
          }}
        >
          Anahtarınız yok mu?{" "}
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#525252", textDecoration: "underline" }}
          >
            console.anthropic.com
          </a>
        </p>
      </div>
    </div>
  );
}
