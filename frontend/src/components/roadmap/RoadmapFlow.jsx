import { useState, useEffect, useCallback } from "react";
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import { MainNode } from "./nodes/MainNode";
import { SubNode } from "./nodes/SubNode";
import NodePopup from "./NodePopup";
import "@xyflow/react/dist/style.css";

// Node types mapping
const nodeTypes = {
  main: MainNode,
  sub: SubNode,
  "main-topic": ({ data }) => (
    <div
      style={{
        padding: "10px",
        fontWeight: 600,
        fontSize: "18px",
        textAlign: "center",
        border: "1px solid #90CAF9",
        backgroundColor: "#E3F2FD",
        borderRadius: "4px",
      }}
    >
      {data.label}
    </div>
  ),
};

// Convert backend roadmap data → React Flow nodes & edges
const generateFlowData = (roadmap) => {
    const nodes = [];
    const edges = [];
    let yPos = 0;
  
    roadmap.forEach((item, index) => {
      const xPos = 0;
  
      // ---------------------------
      // MAIN TOPIC (Heading)
      // ---------------------------
      if (item.type === "MainTopic") {
        nodes.push({
          id: `main-topic-${index}`,
          position: { x: xPos, y: yPos },
          data: { label: item.title },
          type: "main-topic",
          draggable: false,
        });
        yPos += 120; // space before next node
      }
  
      // ---------------------------
      // MAIN NODE
      // ---------------------------
      if (item.type === "MainNode") {
        const mainNodeId = `main-node-${index}`;
  
        nodes.push({
          id: mainNodeId,
          position: { x: xPos, y: yPos },
          data: { label: item.title },
          type: "main",
          draggable: false,
        });
  
        // Edge from last MainTopic → this MainNode
        if (index > 0 && roadmap[index - 1].type === "MainTopic") {
          edges.push({
            id: `edge-topic-${index}`,
            source: `main-topic-${index - 1}`,
            target: mainNodeId,
          });
        }
  
        // ---------------------------
        // SUB-NODES
        // ---------------------------
        if (item.items && item.items.length) {
          item.items.forEach((subItem, subIndex) => {
            const subId = `sub-node-${index}-${subIndex}`;
            const subX = subItem.side === "left" ? -300 : 300; // dynamic side
            const subY = yPos + subIndex * 80;
  
            nodes.push({
              id: subId,
              position: { x: subX, y: subY },
              data: {
                label: subItem.title,
                details: subItem.details,
                handlePosition: subItem.side === "left" ? "right" : "left", // handle faces main node
              },
              type: "sub",
              draggable: false,
            });
  
            // Edge from main node → sub node
            edges.push({
              id: `edge-${mainNodeId}-${subId}`,
              source: mainNodeId,
              target: subId,
            });
          });
        }
  
        yPos += 200; // space after main node
      }
    });
  
    return { nodes, edges };
  };
  

export default function RoadmapFlow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  const onNodeClick = useCallback((e, node) => {
    setSelectedNode(node);
  }, []);

  // Fetch roadmap from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/roadmap")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.roadmap) {
          const { nodes, edges } = generateFlowData(data.roadmap);
          setNodes(nodes);
          setEdges(edges);
        }
      })
      .catch((err) => console.error("Error fetching roadmap:", err));
  }, []);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
        />
      </div>

      {/* Node details popup */}
      <NodePopup node={selectedNode} onClose={() => setSelectedNode(null)} />
    </>
  );
}
