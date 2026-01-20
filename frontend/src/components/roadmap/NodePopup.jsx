export default function NodePopup({ node, onClose }) {
    if (!node) return null;
  
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            minWidth: "300px",
          }}
        >
          <h3>{node.data.label}</h3>
          <p>
            <strong>Node ID:</strong> {node.id}
          </p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
  