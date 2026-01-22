import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Popup } from "./Popup";

export function SubNode({ data }) {
  const isLeft = data.side === "left";
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if details exist
  const hasDetails = data.details !== undefined && data.details !== null && data.details !== "";

  return (
    <>
      <div
        onClick={() => hasDetails && setShowPopup(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="text-xs"
        style={{
          padding: "8px 14px",
          background: hasDetails ? "#FFF3E0" : "#f0f0f0",
          border: hasDetails ? "1px solid #FFB74D" : "1px solid #ccc",
          borderRadius: "8px",
          minWidth: 160,
          textAlign: "center",
          cursor: hasDetails ? "pointer" : "default",
          transform: isHovered && hasDetails ? "scale(1.1)" : "scale(1)",
          boxShadow: isHovered && hasDetails ? "0 8px 16px rgba(0, 0, 0, 0.2)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s ease",
        }}
      >
        <Handle
          type="target"
          position={isLeft ? Position.Right : Position.Left}
        />

        {data.label}
      </div>

      {/* Popup Component */}
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={data.label}
        content={data.details}
      />
    </>
  );
}
