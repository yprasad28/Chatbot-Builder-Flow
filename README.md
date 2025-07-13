# Chatbot Flow Builder

A modern, responsive chatbot flow builder web app inspired by tools like ManyChat and Chatfuel. Built as a submission for the BiteSpeed Frontend Task.

---

## 🚀 Live Demo
[View the deployed app on Netlify](https://chatbot-builder-flow-37b1bf.netlify.app/)

---

## 📝 Project Overview
This project allows users to visually design chatbot conversation flows using a drag-and-drop interface. Users can add, connect, and edit different types of nodes to build complex chatbot logic, save/load their flows, and enjoy a clean, modern UI.

---

## ✨ Features
- **Visual Flow Builder:** Drag-and-drop canvas for building chatbot flows
- **Custom Node Types:**
  - **Message Node:** Represents a bot message (with icons and styled header)
  - **User Input Node:** Captures user responses (with icons and styled header)
- **Sidebar for Adding Nodes:** Add new nodes from a responsive sidebar
- **Node Editing Panel:** Click a node to edit its content in a right sidebar (with icon, title, textarea, and Save Changes button)
- **Persistence:**
  - Save, Load, and Reset flows using localStorage
  - Popup notifications for all actions (no browser alerts)
- **Validation:**
  - Cannot save if any node is unconnected (error popup shown)

- **Pointer/Crosshair Cursor:** Improved UX for connecting nodes

---

## 🛠️ Tech Stack
- **React** (with Vite)
- **React Flow** (for the flow editor)
- **Tailwind CSS** (for styling)
- **react-icons** (for icons)

---

## 📦 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/chatbot-flow-builder.git
   cd chatbot-flow-builder
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the app locally:**
   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

---

## 📋 What Was Implemented (as per BiteSpeed Task)
- Visual flow builder with drag-and-drop nodes and connections
- Two custom node types (Message & User Input), each with unique styling and icons
- Sidebar for adding nodes
- Node editing sidebar with icon, title, textarea, and Save Changes button
- Save, Load, and Reset flow functionality with popup notifications
- Flow validation: cannot save if nodes are unconnected
- Arrowheads on all edges
- Responsive design for all screen sizes
- Modern UI/UX with Tailwind CSS and icons

---

## 📄 License
MIT

---

**Made with ❤️ for the BiteSpeed Frontend Task**
