import { useEffect, useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { api } from "../../api";

import { MainNode } from "./nodes/MainNode";
import { SubNode } from "./nodes/SubNode";

const nodeTypes = {
  main: MainNode,
  sub: SubNode,
};

export default function RoadmapFlow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await api.get("/api/roadmap");
        generateFlow(response.data);
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }
    };

    fetchRoadmap();
  }, []);


  const generateFlow = (topics) => {
    const newNodes = [];
    const newEdges = [];

    console.log("Topics:", topics)

    const centerX = 0;
    const startY = 0;
    const verticalGap = 140;
    const sideGap = 320;

    // Sort topics by order
    topics.sort((a, b) => a.order - b.order);

    topics.forEach((topic, index) => {
      const y = startY + index * verticalGap;

      // Calculate which handles this node has
      const hasSubtopics = topic.subTopics && topic.subTopics.length > 0;
      const handles = {
        top: index > 0,
        bottom: index < topics.length - 1,
        left: hasSubtopics && (topic.side === "center" || topic.side === "left"),
        right: hasSubtopics && (topic.side === "center" || topic.side === "right"),
      };

      // MAIN NODE
      newNodes.push({
        id: topic._id,
        type: "main",
        position: { x: centerX, y },
        data: {
          label: topic.title,
          side: topic.side,
          details: topic.details,
          index,
          total: topics.length,
          handles, // Store handle info
        },
        draggable: false,
      });

      // Subtopics
      topic.subTopics?.forEach((sub, subIndex) => {
        if (!sub) return;

        const isLeft = topic.side === "left";
        const subX = isLeft ? -sideGap : sideGap;
        const subY = y + subIndex * 40 - 30;

        newNodes.push({
          id: sub._id,
          type: "sub",
          position: { x: subX, y: subY },
          data: { label: sub.title, details: sub.details, side: topic.side },
          draggable: false,
        });

        // Edge from main to subtopic - use handle info
        if (sub._id && handles) {
          const sourceHandle = isLeft ? "left" : "right";

          // Only add edge if the handle exists
          if (handles[sourceHandle]) {
            newEdges.push({
              id: `e-${topic._id}-${sub._id}`,
              source: topic._id,
              sourceHandle: sourceHandle,
              target: sub._id,
            });
          }
        }
      });

      // Edge to next main topic
      const nextTopic = topics[index + 1];
      if (nextTopic?._id && handles.bottom) {
        newEdges.push({
          id: `e-${topic._id}-${nextTopic._id}`,
          source: topic._id,
          sourceHandle: "bottom",
          target: nextTopic._id,
          targetHandle: "top",
          type: "smoothstep",
        });
      }

      console.log("RoadmapFlow handles:", handles)
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick = (_, node) => {
    // Popup logic is now handled in SubNode component
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView

        /* 🔒 LOCK node editing */
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}

        panOnDrag={false}        // Disable drag to pan
        panOnScroll={true}       // Enable scroll wheel to pan
        zoomOnScroll={true}     // Disable zoom on scroll
        zoomOnPinch={true}
        zoomOnDoubleClick={false}

        /* Limit panning area */
        translateExtent={[
          [-200, -200],
          [500, 1800]
        ]}
      />
    </div>

  );
}
