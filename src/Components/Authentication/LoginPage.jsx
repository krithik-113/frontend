import axios from "axios";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { saveLoggedInUser } from "../../app/reducer/tokenSlice";
import { emailUpdate } from "../../app/reducer/emailSlice";
import { useContext, useState } from "react";
import EditContext from "../Context API/EditionContext";


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

const LoginPage = ({ setIsLogin }) => {
  const state = useSelector((state) => state.token);
  const [checkAuth, setCheckAuth] = useState(false);
  const [role, setRole] = useState('')
  const dispatch = useDispatch();
  const emailDispatch = useDispatch();

  const { notify, notifyErr, notifyInfo, Details } =
    useContext(EditContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      await axios
        .post("/api/admin/login", {
          email: values.email.toLowerCase().trim(),
          password: values.password.toLowerCase().trim(),
        })
        .then((res) => {
          if (res.data.status && res.data.data.email === values.email) {
            emailDispatch(emailUpdate(res.data.data.email));
            dispatch(saveLoggedInUser(res.data.message));
            setRole(res.data.data.role);
            setCheckAuth(true);
            notifyInfo("Click Check Authorization Button to go further");
          } else {
            notifyErr(res.data.message);
          }
        })
        .catch((err) => console.log(err.message));
    },
  });

  async function checkingAuth(roles) {
    try {
      const { data } = await axios.get("/api/admin/auth", {headers:{Authentication: state.token}})
      if (data.auth) {
        Details();
        localStorage.setItem("token", state.token);
        setIsLogin({ auth: data.auth, roles,token:localStorage.getItem('token') });
        notify("Successfully Logged In");
      } else {
        setIsLogin({ auth: data.auth, roles });
      }
    } catch (error) {
      console.log("Error Ocurred",error.message)
    }
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
          </div>
          {checkAuth ? (
            <button
              onClick={() => checkingAuth(role)}
              type="button"
              className="btn btn-primary"
            >
              Check Authorization
            </button>
          ) : (
            <button
              onClick={formik.handleSubmit}
              type="button"
              className="btn btn-primary">Login</button>
          )}
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
