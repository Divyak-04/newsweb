import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Register from "./pages/Register";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/category/:category" element={<PrivateRoute><Category /></PrivateRoute>} />
      <Route path="/search/:query" element={<PrivateRoute><SearchResults /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
