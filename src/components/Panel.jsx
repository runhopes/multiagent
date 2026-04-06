import { ROLES } from "../config/roles";

export default function Panel({ role, response, isActive, isDone }) {
  const c = ROLES[role];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        border: isActive ? `1.5px solid ${c.accent}` : "1px solid #e5e5e5",
        borderRadius: 10,
        overflow: "hidden",
        transition: "border 0.3s ease",
        background: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: isDone ? c.accent : isActive ? c.accent : "#d4d4d4",
            transition: "background 0.3s",
            boxShadow: isActive ? `0 0 6px ${c.accent}60` : "none",
            animation: isActive ? "blink 1.2s infinite" : "none",
          }}
        />
        <span style={{ fontSize: 13, fontWeight: 600, color: "#171717" }}>
          {c.name}
        </span>
        <span
          style={{
            fontSize: 10,
            color: "#a3a3a3",
            fontFamily: "monospace",
            marginLeft: "auto",
          }}
        >
          {c.model}
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          padding: 16,
          overflowY: "auto",
          fontSize: 12.5,
          lineHeight: 1.75,
          color: "#404040",
          fontFamily: "'SF Mono', 'Cascadia Code', 'Consolas', monospace",
          whiteSpace: "pre-wrap",
        }}
      >
        {response || (
          <span
            style={{
              color: "#c4c4c4",
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
            }}
          >
            {isActive ? "Çalışıyor..." : `${c.tag} aşaması bekliyor`}
          </span>
        )}
      </div>

      {/* Footer */}
      {(isDone || isActive) && (
        <div
          style={{
            padding: "8px 16px",
            borderTop: "1px solid #f5f5f5",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: "#a3a3a3",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "1px 8px",
              borderRadius: 4,
              background: isDone ? `${c.accent}12` : "#fafafa",
              color: isDone ? c.accent : "#a3a3a3",
              fontWeight: 500,
              fontSize: 10,
              border: `1px solid ${isDone ? `${c.accent}30` : "#eee"}`,
            }}
          >
            {isDone ? "tamamlandı" : "çalışıyor"}
          </span>
          <span style={{ marginLeft: "auto" }}>{c.tag}</span>
        </div>
      )}
    </div>
  );
}
