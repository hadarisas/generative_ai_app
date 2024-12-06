import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Prompt from "./views/PromptView";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Prompt />} />
      </Routes>
    </Router>
  );
}

export default App;
