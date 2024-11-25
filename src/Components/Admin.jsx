import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditContext from "./Context API/EditionContext";

const Admin = () => {
  const {
    fname,
    setFName,
    handleEditingUser,
    email,
    setEmail,
    lname,
    setLName,
    setPassword,
    setExp,
    setSalary,
    handleSaveChanges,
    id,
    notify,
    setUser,
    user,
    notifyInfo,
    notifyanoInfo,
    notifyWar,
  } = useContext(EditContext);
  const emailState = useSelector((state) => state.email);
  const [role, setRole] = useState("");
  const [adminMsg, setAdminMsg] = useState([]);

  useEffect(() => {
    user.length === 1 &&
      notifyanoInfo(`Hi first login credentials always be admin`);
  }, [user.length]);

  const handleUserRole = async (email, roles) => {
    if (roles) {
      await axios.put(`/api/details/user/update/${emailState.email}`,{
            role: roles,
            userEmail: email,
          })
        .then((res) => {
          console.log(res.data);
          if (res.data.warning) {
            notifyWar(res.data.warning);
          } else {
            notify(res.data.message);
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      notifyInfo("Nothing is there to save...");
    }
  };
  const handleEmailbox = async () => {
    axios
      .get(`/api/details/rolechange/request/${emailState.email}`)
      .then((res) => {
        if (res.data) {
          if (res.data.request && res.data.request.length) {
            setAdminMsg(res.data.request);
          } else {
            setAdminMsg(res.data.message);
          }
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleDeleteMsg = async (id) => {
    await axios
      .put(`/api/details/msgdelete/${emailState.email}`, { id })
      .then((res) => {
        notify("Message deleted successfully");
        handleEmailbox();
      })
      .catch((err) => console.log(err.message));
  };

  //  delete
  const handleDeleteUser = async (id, name) => {
    await axios
      .delete(`/api/delete/user/${id}`)
      .then((res) => {
        setUser(res.data.users.reverse());
        notify(`User record of ${name} is Deleted Successfully`);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Admin</h1>
        <Link to="/reports">
          <h3>Reports </h3>{" "}
        </Link>
        <h3>
          <EmailOutlinedIcon
            onClick={handleEmailbox}
            data-toggle="modal"
            data-target="#exampleModalLong"
          />
        </h3>
      </header>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">_id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        {user.length &&
          user.map((val, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{val.firstName + " " + val.lastName}</td>
                  <td>{val.email}</td>
                  <td>
                    {emailState.email === val.email ? (
                      val.role
                    ) : (
                      <select onChange={(e) => setRole(e.target.value)}>
                        <option>{val.role}</option>
                        <option>
                          {val.role === "admin" ? "user" : "admin"}
                        </option>
                      </select>
                    )}
                  </td>
                  <td>
                    {emailState.email === val.email ? (
                      <div>
                        <button
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => handleEditingUser(val._id)}
                        >
                          Edit
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          style={{ width: "35%", marginRight: "10px" }}
                          onClick={() => handleUserRole(val.email, role)}
                          className="btn btn-primary"
                        >
                          Save
                        </button>
                        <button
                          style={{ width: "40%" }}
                          className="btn btn-danger"
                          onClick={() =>
                            handleDeleteUser(
                              val._id,
                              val.firstName + " " + val.lastName
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Messages from Users
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {adminMsg && adminMsg.length && typeof adminMsg !== "string" ? (
                adminMsg.map((val, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h6>{index + 1 + ". " + val.userEmail}</h6>
                        <h6>
                          <span style={{ color: "red" }}>Message:- </span>
                          {val.message}
                        </h6>
                        <hr/>
                      </div>
                      <div>
                        <DeleteOutlineOutlinedIcon
                          onClick={() => handleDeleteMsg(val.id)}
                          style={{ cursor: "pointer", color: "red" }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <h6>{adminMsg}</h6>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* admin edit Popup */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <label htmlFor="firstname">First Name: </label>
                <input
                  type="text"
                  id="firstname"
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                  className="form-control"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>

              <div className="input-group mb-3">
                <label htmlFor="lastname">Last Name: </label>
                <input
                  type="text"
                  id="lastname"
                  value={lname}
                  onChange={(e) => setLName(e.target.value)}
                  className="form-control"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>

              <div className="input-group mb-3">
                <label htmlFor="email">Useremail: </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>

              <div className="input-group mb-3">
                <label htmlFor="pass">Password: </label>
                <input
                  type="password"
                  id="pass"
                  placeholder="****"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>

              <label htmlFor="exp">N0. of year's Experience:</label>
              <select
                id="exp"
                className="custom-select custom-select-lg mb-3"
                onChange={(e) => setExp(e.target.value)}
              >
                <option value="">Open this select menu</option>
                <option value="1 year">1 year</option>
                <option value="2 year's">2 year's</option>
                <option value="3 year's">3 year's</option>
                <option value="4 year's">4 year's</option>
                <option value="5 year's">5 year's</option>
                <option value="6 year's">6 year's</option>
                <option value="7 year's">7 year's</option>
                <option value="8 year's">8 year's</option>
                <option value="9 year's">9 year's</option>
                <option value="10 year's">10 year's</option>
              </select>

              <label htmlFor="salary">Salary:</label>
              <select
                id="salary"
                className="custom-select custom-select-lg mb-3"
                onChange={(e) => setSalary(e.target.value)}
              >
                <option value="">Open this select menu</option>
                <option value="15,000k">15,000k</option>
                <option value="25,000k">25,000k</option>
                <option value="35,000k">35,000k</option>
                <option value="45,000k">45,000k</option>
                <option value="55,000k">55,000k</option>
                <option value="60,000k">60,000k</option>
                <option value="65,000k">65,000k</option>
                <option value="70,000k">70,000k</option>
                <option value="75,000k">75,000k</option>
                <option value="80,000k">80,000k</option>
                <option value="85,000k">85,000k</option>
                <option value="90,000k">90,000k</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSaveChanges(id)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
