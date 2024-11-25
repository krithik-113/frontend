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
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLogin({})
  }

  useEffect(() => {
    if (isLogin.token) {
      if (isLogin.roles === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      navigate("/login");
    }
  }, [isLogin.auth,isLogin.token,isLogin.roles]);

  return (
    <div className="container">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand">(RB-AC) System</span>
          <div className="d-flex">
            <ul>
              <Link to="/" onClick={handleLogout}>
                <li>Home</li>
              </Link>
              {!isLogin.token ? (
                <>
                  <Link to="/register">
                    <li>Register</li>
                  </Link>
                  <Link to="/login">
                    <li onClick={() => handleClickRefresh("login")}>Log In</li>
                  </Link>
                </>
              ) : (
                <>
                  <Link onClick={handleLogout}>
                    <li>Logout</li>
                  </Link>
                </>
              )}
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
