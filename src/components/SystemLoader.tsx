export function SystemLoader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 400,
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        color: "var(--cyan)",
        letterSpacing: 2,
        textTransform: "uppercase",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 32,
            height: 32,
            border: "2px solid var(--border-default)",
            borderTopColor: "var(--cyan)",
            borderRadius: "50%",
            margin: "0 auto 16px",
            animation: "spin 1s linear infinite",
          }}
        />
        <div>Initializing Systems...</div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
