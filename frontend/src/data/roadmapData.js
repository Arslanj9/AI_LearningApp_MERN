export const initialNodes = [
    // MAIN NODE
    {
      id: "ml",
      position: { x: 0, y: 0 },
      data: { label: "Machine Learning" },
      type: "main",
      draggable: false,
    },
  
    // SUB-NODES (branching from ML)
    {
      id: "introduction",
      position: { x: 300, y: 0 },
      data: { label: "Introduction" },
      type: "sub",
      draggable: false,
    },
    {
      id: "math",
      position: { x: 300, y: 120 },
      data: { label: "Mathematical Foundations" },
      type: "sub",
      draggable: false,
    },
    {
      id: "programming",
      position: { x: 300, y: 240 },
      data: { label: "Programming for ML" },
      type: "sub",
      draggable: false,
    },
  ];
  
  export const initialEdges = [
    { id: "e-ml-intro", source: "ml", target: "introduction" },
    { id: "e-ml-math", source: "ml", target: "math" },
    { id: "e-ml-programming", source: "ml", target: "programming" },
  ];
  