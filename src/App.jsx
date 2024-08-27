import { Link, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Components/Authentication/LoginPage";
import Register from "./Components/Authentication/Register";
import Home from "./Components/Authentication/Home";
import User from "./Components/User";
import NotFound from "./Components/NotFound";
import {  useEffect, useState } from "react";
import Admin from "./Components/Admin";
import Reports from './Components/assest/Reports'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLogin, setIsLogin] = useState({});
  
  const navigate = useNavigate();

   function handleClickRefresh() {
       window.location.reload();
       navigate("/login");
  }

  useEffect(() => {
     
    if (isLogin.auth) {
      if (isLogin.roles === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      navigate("/login");
    }
  }, [isLogin.auth]);

  return (
    <div className="container">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand">(RB-AC) System</span>
          <div className="d-flex">
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/register">
                <li>Register</li>
              </Link>
              <Link to="/login">
                <li onClick={() => handleClickRefresh("login")}>Log In</li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Register handleClickRefresh={handleClickRefresh} />}
        />
        <Route path="/login" element={<LoginPage setIsLogin={setIsLogin} />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
