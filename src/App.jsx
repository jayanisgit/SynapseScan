import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PredictorPage from "./pages/PredictorPage/PredictorPage";
import About from "./pages/About/About";
import TopBar from "./components/TopBar/TopBar";

function App() {
  return (
    <BrowserRouter>
      <div className="main-wrapper">
        {/* Top Navigation */}
        <TopBar />

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<PredictorPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
