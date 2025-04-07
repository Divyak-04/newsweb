import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./quiz";
import Fact from "./Fact";
import GameContainer from "./Sudoku"; // or wherever the file is located
import Timeline from "./timeline";
import Group1 from "./pages/group1";
import Group2 from "./pages/group2";
import Group3 from "./pages/group3";
import Group4 from "./pages/group4";
import MapPage from './pages/MapPage'; 

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/fact" element={<Fact />} />
      <Route path="/Sudoku" element={<GameContainer />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/category/:category" element={<PrivateRoute><Category /></PrivateRoute>} />
      <Route path="/search/:query" element={<PrivateRoute><SearchResults /></PrivateRoute>} />
      <Route path="/group1" element={<Group1 />} />
        <Route path="/group2" element={<Group2 />} />
        <Route path="/group3" element={<Group3 />} />
        <Route path="/group4" element={<Group4 />} />
        <Route path="/map" element={<MapPage />} />
    </Routes>
  );
}

export default App;
