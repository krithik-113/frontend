import axios from "axios";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { saveLoggedInUser } from "../../app/reducer/tokenSlice";
import { emailUpdate } from "../../app/reducer/emailSlice";
import { useState } from "react";


const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "*Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (!values.password) {
    errors.password = "*Required";
  } 
  return errors;
};

const LoginPage = ({ setIsLogin, isLogin }) => {
  
  const state = useSelector((state) => state.token);
  const [checkAuth,setCheckAuth] = useState(false)
  const dispatch = useDispatch();
  const emailDispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      await axios
        .post("https://backend-tpel.onrender.com/api/admin/login", {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.data.status && res.data.data.email === values.email) {
            emailDispatch(emailUpdate(res.data.data.email));
            dispatch(saveLoggedInUser(res.data.message));
            checkingAuth(res.data.data.role);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => console.log(err.message));
    },
  });
  async function checkingAuth(roles) {
    await axios
      .get("https://backend-tpel.onrender.com/api/admin/auth", {
        headers: {
          Authentication: state.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCheckAuth(true);
        if (res.data.auth) {
          setIsLogin({ auth: res.data.auth, roles });
        } else {
          setIsLogin({ auth: res.data.auth, roles });
        }
      })
      .catch((err) => console.log(err.message));
  }
   
  return (
    <>
      <div className="login-page">
        <form className="login-form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address *
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="example@email.com"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              required
            />
            <p style={{ color: "red" }}>{formik.errors.email}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password *
            </label>
            <input
              type="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="password"
              className="form-control"
              id="password"
              placeholder="*******"
              required
            />
            <p style={{ color: "red" }}>{formik.errors.password}</p>
          </div><button
            onClick={formik.handleSubmit}
            type="button"
            className="btn btn-primary"
          >
            {checkAuth ? "Check Authorization" : "Login"}
          </button>
        </form>
      </div>
      <div className="footer">
        <p>
          Don't have an account?{" "}
          <span>
            <Link to="/register">Register</Link>
          </span>
        </p>
      </div>
      <br />
    </>
  );
};

export default LoginPage;