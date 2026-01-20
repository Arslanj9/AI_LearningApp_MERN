import { Handle, Position } from "@xyflow/react";

export function MainNode({ data }) {
  return (
    <div
      style={{
        fontSize: '10px',
        padding: "10px 20px",
        background: "#E3F2FD",
        border: "1px solid #90CAF9",
        borderRadius: "8px",
        fontWeight: "600",
        color: "#0D47A1",
        minWidth: "150px",
        textAlign: "center",
      }}
    >
      {data.label}

      {/* Right handle for connecting to sub-nodes */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
