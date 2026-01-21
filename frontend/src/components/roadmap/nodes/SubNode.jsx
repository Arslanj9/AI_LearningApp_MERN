import { Handle, Position } from "@xyflow/react";

export function SubNode({ data }) {
  const isLeft = data.side === "left";
  

  return (
    <div
      style={{
        fontSize: "11px",
        padding: "8px 14px",
        background: "#E8F5E9",
        border: "1px solid #A5D6A7",
        borderRadius: "8px",
        minWidth: 160,
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <Handle
        type="target"
        position={isLeft ? Position.Right : Position.Left}
      />

      {data.label}
    </div>
  );
}
