import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import NewUserLogin from "./components/NewUserLogin";
import Dashboard from "./components/Dashboard";
import AddEventPage from "./components/AddEventPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<NewUserLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-event" element={<AddEventPage />} />
    </Routes>
  );
}

export default App;
