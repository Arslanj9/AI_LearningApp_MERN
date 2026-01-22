import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Popup } from "./Popup";

export function MainNode({ data }) {
  const { side = "center", index, total, details, handles } = data;
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if details exist
  const hasDetails = details !== undefined && details !== null && details !== "";


  return (
    <>
      <div
        onClick={() => hasDetails && setShowPopup(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="text-xl"
        style={{
          maxWidth: 200,
          padding: "14px 20px",
          background: hasDetails ? "#bfddff" : "#f6fafd91",
          border: hasDetails ? "2px solid #90CAF9" : "none",
          borderRadius: "10px",
          fontWeight: 200,
          minWidth: 220,
          textAlign: "center",
          cursor: hasDetails ? "pointer" : "default",
          transition: "all 0.3s ease",
          transform: isHovered && hasDetails ? "scale(1.08)" : "scale(1)",
          boxShadow: isHovered && hasDetails ? "0 8px 16px rgba(0, 0, 0, 0.2)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
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

      {/* Popup Component */}
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={data.label}
        content={details}
      />
    </>
  );
}