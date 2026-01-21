import { useState } from "react";
import { Handle, Position } from "@xyflow/react";

export function MainNode({ data }) {
  const { side = "center", index, total, details, handles } = data;
  const [showPopup, setShowPopup] = useState(false);

  // Check if details exist
  const hasDetails = details !== undefined && details !== null && details !== "";

  console.log("Main Node:", data);

  return (
    <>
      <div
        onClick={() => hasDetails && setShowPopup(true)}
        style={{
          maxWidth: 200,
          padding: "14px 20px",
          background: hasDetails ? "#E3F2FD" : "#f6fafd91",
          border: hasDetails ? "2px solid #90CAF9" : "none",
          borderRadius: "10px",
          fontWeight: 600,
          minWidth: 220,
          textAlign: "center",
          cursor: hasDetails ? "pointer" : "default",
        }}
      >
        {data.label}

        {/* Branching handles - use handles object instead of details */}
        {handles?.left && (
          <Handle type="source" position={Position.Left} id="left" />
        )}
        {handles?.right && (
          <Handle type="source" position={Position.Right} id="right" />
        )}

        {/* Vertical handles based on handles object */}
        {handles?.top && <Handle type="target" position={Position.Top} id="top" />}
        {handles?.bottom && <Handle type="source" position={Position.Bottom} id="bottom" />}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              maxWidth: "500px",
              maxHeight: "80vh",
              overflow: "auto",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "16px" }}>{data.label}</h3>
            <div style={{ lineHeight: 1.6 }}>{details}</div>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                marginTop: "20px",
                padding: "8px 16px",
                background: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}