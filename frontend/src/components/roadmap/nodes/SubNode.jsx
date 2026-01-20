import { Handle, Position } from "@xyflow/react";

export function SubNode({ data }) {
  return (
    <div
      style={{
        fontSize: '10px',
        padding: "8px 16px",
        background: "#E8F5E9",
        border: "1px solid #A5D6A7",
        borderRadius: "6px",
        color: "#1B5E20",
        minWidth: "130px",
        textAlign: "center",
      }}
    >
      {/* Left handle for receiving connection from main node */}
      <Handle type="target" position={Position.Left} />
      {data.label}
    </div>
  );
}
