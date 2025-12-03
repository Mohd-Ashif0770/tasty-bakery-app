import "./App.css";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      
    </>
  );
}

export default App;
