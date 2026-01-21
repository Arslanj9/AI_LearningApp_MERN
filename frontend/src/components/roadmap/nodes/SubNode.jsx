import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Popup } from "./Popup";

export function SubNode({ data }) {
  const isLeft = data.side === "left";
  const [showPopup, setShowPopup] = useState(false);

  // Check if details exist
  const hasDetails = data.details !== undefined && data.details !== null && data.details !== "";

  return (
    <>
      <div
        onClick={() => hasDetails && setShowPopup(true)}
        style={{
          fontSize: "11px",
          padding: "8px 14px",
          background: hasDetails ? "#E8F5E9" : "#f0f0f0",
          border: hasDetails ? "1px solid #A5D6A7" : "1px solid #ccc",
          borderRadius: "8px",
          minWidth: 160,
          textAlign: "center",
          cursor: hasDetails ? "pointer" : "default",
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
