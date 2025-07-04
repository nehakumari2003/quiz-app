import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import ScorePage from "./pages/ScorePage";
import AdminLogin from "./pages/AdminLogin"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} /> 
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create" element={<CreateQuiz />} />
        <Route path="/quiz/:id" element={<TakeQuiz />} />
        <Route path="/quiz/:id/score" element={<ScorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
