import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Dishes from "./pages/Dishes.jsx";
import Drinks from "./pages/Drinks.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/drinks" element={<Drinks />} />
      </Routes>
    </Router>
  );
}

export default App;
