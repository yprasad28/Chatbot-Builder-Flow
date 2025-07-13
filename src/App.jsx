import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MessageNode from "./nodes/MessageNode";
import UserInputNode from "./nodes/UserInputNode";
import Sidebar from "./Sidebar";
import { BiArrowBack, BiMessageRoundedDetail } from 'react-icons/bi';

const nodeTypes = {
  message: MessageNode,
  userInput: UserInputNode,
};

const initialNodes = [
  {
    id: "1",
    type: "message",
    position: { x: 0, y: 0 },
    data: { label: "Hello! How can I help you?" },
  },
  {
    id: "2",
    type: "userInput",
    position: { x: 200, y: 100 },
    data: { label: "Type your answer..." },
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [nodeId, setNodeId] = useState(3); // for unique node ids
  const [selectedNode, setSelectedNode] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({ message: "", type: "" });

  // Flow validation: all nodes except the first must have at least one incoming edge
  const isFlowValid = () => {
    if (nodes.length === 0) return false;
    const nodeIds = nodes.map((n) => n.id);
    const targetIds = edges.map((e) => e.target);
    // The first node (lowest id) is allowed to have no incoming edge
    const firstNodeId = nodeIds.reduce((min, id) => (parseInt(id) < parseInt(min) ? id : min), nodeIds[0]);
    return nodeIds.every(
      (id) => id === firstNodeId || targetIds.includes(id)
    );
  };

  // Show error for 2 seconds then hide
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError("") , 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Show popup for 2 seconds then hide
  useEffect(() => {
    if (popup.message) {
      const timer = setTimeout(() => setPopup({ message: "", type: "" }), 2000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  // Save flow to localStorage with validation
  const handleSave = () => {
    if (!isFlowValid()) {
      setError("Cannot save Flow: All nodes must be connected.");
      return;
    }
    localStorage.setItem('chatbot-nodes', JSON.stringify(nodes));
    localStorage.setItem('chatbot-edges', JSON.stringify(edges));
    setPopup({ message: 'Flow saved!', type: 'success' });
  };

  // Load flow from localStorage
  const handleLoad = () => {
    const savedNodes = JSON.parse(localStorage.getItem('chatbot-nodes'));
    const savedEdges = JSON.parse(localStorage.getItem('chatbot-edges'));
    if (savedNodes && savedEdges) {
      setNodes(savedNodes);
      setEdges(savedEdges);
      // Update nodeId to avoid duplicate IDs
      const maxId = savedNodes.reduce((max, n) => Math.max(max, parseInt(n.id)), 0);
      setNodeId(maxId + 1);
      setPopup({ message: 'Flow loaded!', type: 'info' });
    } else {
      setPopup({ message: 'No saved flow found.', type: 'error' });
    }
  };

  // Reset flow to initial state
  const handleReset = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setNodeId(3);
    setSelectedNode(null);
    setPopup({ message: 'Flow reset!', type: 'info' });
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Handler to add a new node
  const handleAddNode = (type) => {
    const newNode = {
      id: nodeId.toString(),
      type,
      position: { x: 100 + nodeId * 40, y: 100 + nodeId * 40 },
      data: {
        label: type === 'message' ? 'New Message' : 'User input...'
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId((id) => id + 1);
  };

  // Open sidebar and set editLabel when node is clicked
  const onNodeClick = (_event, node) => {
    setSelectedNode(node);
    setEditLabel(node.data.label);
  };

  // Handler for label change in textarea
  const handleLabelChange = (e) => {
    setEditLabel(e.target.value);
  };

  // Save changes and close sidebar
  const handleSaveChanges = () => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode.id ? { ...n, data: { ...n.data, label: editLabel } } : n
      )
    );
    setSelectedNode(null);
  };

  // Handler to close the edit sidebar
  const closeEditSidebar = () => setSelectedNode(null);

  const defaultEdgeOptions = {
    markerEnd: 'arrowclosed',
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* Error Message */}
      {error && (
        <div className="fixed left-1/2 top-20 transform -translate-x-1/2 z-40 bg-red-100 border border-red-400 text-red-700 px-6 py-2 rounded shadow">
          {error}
        </div>
      )}
      {/* General Popup Message */}
      {popup.message && (
        <div className={`fixed left-1/2 top-32 transform -translate-x-1/2 z-40 px-6 py-2 rounded shadow font-semibold
          ${popup.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : ''}
          ${popup.type === 'info' ? 'bg-blue-100 border border-blue-400 text-blue-700' : ''}
          ${popup.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : ''}
        `}>
          {popup.message}
        </div>
      )}
      {/* Save/Load/Reset Buttons - Centered Top */}
      <div className="fixed left-1/2 top-4 transform -translate-x-1/2 z-30 flex flex-col md:flex-row gap-2 w-full max-w-xs md:max-w-2xl">
        <button
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded border border-blue-300 hover:bg-blue-200"
          onClick={handleSave}
        >
          Save Flow
        </button>
        <button
          className="bg-green-100 text-green-700 px-3 py-1 rounded border border-green-300 hover:bg-green-200"
          onClick={handleLoad}
        >
          Load Flow
        </button>
        <button
          className="bg-gray-100 text-gray-700 px-3 py-1 rounded border border-gray-300 hover:bg-gray-200"
          onClick={handleReset}
        >
          Reset Flow
        </button>
      </div>
      <Sidebar onAddNode={handleAddNode} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={onNodeClick}
        defaultEdgeOptions={defaultEdgeOptions}
      />
      {/* Node Edit Sidebar */}
      {selectedNode && (
        <div className="fixed right-0 top-0 h-full w-full max-w-md md:w-96 bg-white shadow-2xl z-20 flex flex-col border-l border-gray-200 overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
            <button onClick={() => setSelectedNode(null)} className="text-gray-500 hover:text-gray-700 text-2xl">
              <BiArrowBack />
            </button>
            <div className="flex items-center gap-2">
              <BiMessageRoundedDetail className="text-green-600 text-xl" />
              <span className="font-semibold text-lg text-black">Message</span>
            </div>
            <button
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 border border-blue-600 font-semibold"
            >
              Save Changes
            </button>
          </div>
          {/* Content */}
          <div className="flex flex-col gap-2 p-6 flex-1">
            <label className="font-semibold mb-1 text-gray-700">Text</label>
            <textarea
              className="border bg-white text-black px-3 py-2 rounded min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={editLabel}
              onChange={handleLabelChange}
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
