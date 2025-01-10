import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/pages/WelcomeScreen";
import Onboarding from "./components/pages/Onboarding";
import Dashboard from "./components/pages/Dashboard";

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
