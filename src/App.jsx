import { Link, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Components/Authentication/LoginPage";
import Register from "./Components/Authentication/Register";
import Home from "./Components/Authentication/Home";
import User from "./Components/User";
import NotFound from "./Components/NotFound";
import { useContext, useEffect, useState } from "react";
import Admin from "./Components/Admin";
import axios from "axios";
import Reports from './Components/assest/Reports'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditContext from "./Components/Context API/EditionContext";

function App() {
  const [isLogin, setIsLogin] = useState({});
   const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const {notifyInfo,notify,notifyErr,notifyWar} = useContext(EditContext)

   function handleClickRefresh() {
       window.location.reload();
       navigate("/login");
  }

  useEffect(() => {
     
    if (isLogin.auth) {
      if (isLogin.roles === "admin") {
        user.length === 1 && notifyInfo(`Hi First Login credentials always be admin`)
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      navigate("/login");
    }
  }, [isLogin.auth]);

  async function RoleOfUser(userEmail, adminEmail, message, setMsg) {
    if (adminEmail && message) {
      await axios
        .put("https://backend-tpel.onrender.com/api/details/userrolechange", {
          userEmail,
          adminEmail,
          message,
        })
        .then((res) => {
          setMsg("");
          if (res.data.message) {
            notifyWar(res.data.message)
          } else {
             notify("Request send to admin Successfully ... !");
          }
          
        })
        .catch((err) => console.log(err.message));
    } else {
      notifyErr("One Admin is required and message also!");
    }
  }

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
        <Route path="/register" element={<Register handleClickRefresh={handleClickRefresh} />} />
        <Route path="/login" element={<LoginPage setIsLogin={setIsLogin} />} />
        <Route path="/user" element={<User RoleOfUser={RoleOfUser} />} />
        <Route path="/admin" element={<Admin user={user} setUser={setUser}  />} />
        <Route path="/reports" element={<Reports  user={user}/>} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
