import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/createPage";
import UpdatePage from "./pages/updatePage";
import toast from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:id" element={<UpdatePage />} />
      </Routes>
    </div>
  );
}

export default App;
