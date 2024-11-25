import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditContext from "../Context API/EditionContext";

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "*Required";
  } else if (!values.lastName) {
    errors.lastName = "*Required";
  }  else if (!values.email) {
    errors.email = "*Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (!values.password) {
    errors.password = "*Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password doesn't match";
  }
  return errors;
};

const Register = ({ handleClickRefresh }) => {
  const {notifyErr,notify} = useContext(EditContext)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      axios
        .post("/api/admin/register", {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email.toLowerCase().trim(),
          password: values.password.toLowerCase().trim(),
        })
        .then((res) => {
          if (res.data.message) {
            notifyErr(res.data.message);
          } else {
            notify(`Hello ${values.firstName+" "+values.lastName} you have successfully registered and try to login. Thank You...!`)
            navigate("/");
            resetForm();
          }
        })
        .catch((err) => console.log(err.message));
    },
  });

  return (
    <>
      <div className="register">
        <form className="register-form">
          <div className="row">
            <div className="col">
              <label htmlFor="firstname" className="form-label">
                First Name *
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="First name"
                aria-label="First name"
                name="firstName"
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                required
              />
              <p style={{ color: "red" }}>{formik.errors.firstName}</p>
            </div>
            <div className="col">
              <label htmlFor="lastname" className="form-label">
                Last Name *
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Last name"
                aria-label="Last name"
                onBlur={formik.handleBlur}
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                required
              />
              <p style={{ color: "red" }}>{formik.errors.lastName}</p>
            </div>
          </div>
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password *
            </label>
            <input
              type="password"
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="confirmPassword"
              className="form-control"
              id="confirmPassword"
              placeholder="*******"
              required
            />
            <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>
          </div>
          <button
            onClick={formik.handleSubmit}
            type="button"
            className="btn btn-primary"
          >
            Register
          </button>
        </form>
      </div>
      <div className="footer">
        <p>
          Already have an account?{" "}
          <span>
            <Link to="/login" onClick={handleClickRefresh}>
              Login
            </Link>
          </span>
        </p>
      </div>
      <br />
    </>
  );
};

export default Register;
