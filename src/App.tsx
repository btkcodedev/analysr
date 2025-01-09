import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/index/WelcomeScreen";
import Onboarding from "./components/index/Onboarding";
import Dashboard from "./components/index/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
