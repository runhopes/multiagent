import { useState } from "react";
import { callClaude } from "./utils/api";
import Panel from "./components/Panel";
import ApiKeyScreen from "./components/ApiKeyScreen";

function StepIndicator({ number, label, done }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: done ? "none" : "1.5px solid #d4d4d4",
          background: done ? "#171717" : "transparent",
          color: done ? "#fff" : "#a3a3a3",
          fontSize: 10,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s",
        }}
      >
        {done ? "✓" : number}
      </div>
      <span
        style={{
          fontSize: 12,
          color: done ? "#171717" : "#a3a3a3",
          fontWeight: done ? 500 : 400,
          transition: "all 0.3s",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Arrow({ active }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        color: active ? "#171717" : "#d4d4d4",
        fontSize: 14,
        transition: "color 0.3s",
      }}
    >
      →
    </div>
  );
}

export default function App() {
  const [keySet, setKeySet] = useState(!!localStorage.getItem("ac_key"));
  const [input, setInput] = useState("");
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(-1);
  const [responses, setResponses] = useState({
    manager: "",
    coder: "",
    analyst: "",
  });
  const [error, setError] = useState("");

  if (!keySet) {
    return <ApiKeyScreen onSave={() => setKeySet(true)} />;
  }

  async function run() {
    if (!input.trim() || running) return;
    setRunning(true);
    setError("");
    setResponses({ manager: "", coder: "", analyst: "" });

    try {
      // 1 — Yönetici: görevi planla
      setPhase(0);
      const managerRes = await callClaude(
        "manager",
        `Kullanıcı şunu istiyor: "${input}"\nBu görevi Kodcu'ya nasıl atayacağını planla. Net bir görev tanımı yaz.`
      );
      setResponses((p) => ({ ...p, manager: managerRes }));

      // 2 — Kodcu: kodu yaz
      setPhase(1);
      const coderRes = await callClaude(
        "coder",
        `Yöneticinin sana verdiği görev:\n${managerRes}\n\nBu görevi yerine getir ve kodu yaz.`
      );
      setResponses((p) => ({ ...p, coder: coderRes }));

      // 3 — Analist: kodu incele
      setPhase(2);
      const analystRes = await callClaude(
        "analyst",
        `Aşağıdaki kodu incele:\n\n${coderRes}\n\nHata, güvenlik, performans kontrolü yap. 1-10 arası puanla.`
      );
      setResponses((p) => ({ ...p, analyst: analystRes }));

      setPhase(3);
    } catch (e) {
      setError(e.message);
    }

    setRunning(false);
  }

  function reset() {
    setPhase(-1);
    setResponses({ manager: "", coder: "", analyst: "" });
    setError("");
    setInput("");
  }

  function logout() {
    localStorage.removeItem("ac_key");
    setKeySet(false);
    reset();
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#fafafa",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "14px 24px",
          background: "#fff",
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#171717",
            letterSpacing: -0.3,
          }}
        >
          agent chain
        </span>

        <div style={{ height: 16, width: 1, background: "#e5e5e5" }} />

        {/* Steps */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <StepIndicator number={1} label="Plan" done={phase > 0} />
          <span style={{ color: "#d4d4d4", fontSize: 10 }}>→</span>
          <StepIndicator number={2} label="Kod" done={phase > 1} />
          <span style={{ color: "#d4d4d4", fontSize: 10 }}>→</span>
          <StepIndicator number={3} label="İncele" done={phase > 2} />
        </div>

        <div style={{ flex: 1 }} />

        {/* Input */}
        <div style={{ display: "flex", gap: 8, maxWidth: 400, flex: 1 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="Görev girin..."
            disabled={running}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #e5e5e5",
              background: "#fafafa",
              color: "#171717",
              fontSize: 13,
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={run}
            disabled={running || !input.trim()}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "none",
              background: running ? "#e5e5e5" : "#171717",
              color: running ? "#a3a3a3" : "#fff",
              fontWeight: 600,
              fontSize: 12,
              cursor: running ? "wait" : "pointer",
              fontFamily: "inherit",
              flexShrink: 0,
            }}
          >
            {running ? "Çalışıyor..." : "Başlat"}
          </button>
          {phase >= 0 && (
            <button
              onClick={reset}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #e5e5e5",
                background: "#fff",
                color: "#737373",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "inherit",
                flexShrink: 0,
              }}
            >
              Sıfırla
            </button>
          )}
        </div>

        <button
          onClick={logout}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #e5e5e5",
            background: "#fff",
            color: "#a3a3a3",
            fontSize: 11,
            cursor: "pointer",
            fontFamily: "inherit",
            flexShrink: 0,
          }}
        >
          Çıkış
        </button>
      </header>

      {/* Error */}
      {error && (
        <div
          style={{
            margin: "10px 24px 0",
            padding: "10px 14px",
            borderRadius: 6,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            fontSize: 12,
            flexShrink: 0,
          }}
        >
          {error}
        </div>
      )}

      {/* Panels */}
      <main
        style={{
          flex: 1,
          display: "flex",
          gap: 14,
          padding: "18px 24px 24px",
          minHeight: 0,
        }}
      >
        <Panel
          role="manager"
          response={responses.manager}
          isActive={running && phase === 0}
          isDone={!!responses.manager}
        />
        <Arrow active={phase > 0} />
        <Panel
          role="coder"
          response={responses.coder}
          isActive={running && phase === 1}
          isDone={!!responses.coder}
        />
        <Arrow active={phase > 1} />
        <Panel
          role="analyst"
          response={responses.analyst}
          isActive={running && phase === 2}
          isDone={!!responses.analyst}
        />
      </main>
    </div>
  );
}
