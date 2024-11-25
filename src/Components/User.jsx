import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditContext from "./Context API/EditionContext";

const User = () => {
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
    RoleOfUser,
  } = useContext(EditContext);
  const emailState = useSelector((state) => state.email);
  const [User, setUser] = useState([]);
  const [admin, setAdmins] = useState([]);

  const [role, setRole] = useState();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    emailState.email &&
      axios
        .get(`/api/details/user/${emailState.email}`)
        .then((res) => {
          const user = [...User];
          user.push(res.data.Data);
          setUser(user);
        })
        .catch((err) => console.log(err.message));
  }, []);

  async function handleRoleOfUser() {
    await axios.post("/api/details/rolechange")
      .then((res) => {
        if (res.data.namesOfAdmin) {
          setAdmins(res.data.namesOfAdmin);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div>
      <h3
        onClick={handleRoleOfUser}
        style={{ textAlign: "center" }}
        data-toggle="modal"
        data-target="#exampleModalLong"
      >
        <Link>Raise a request for Admin</Link>
      </h3>
      <h1>User</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">_id</th>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        {User.length &&
          User.map((val, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{val.firstName}</td>
                  <td>{val.lastName}</td>
                  <td>{val.email}</td>
                  <td>{val.role}</td>
                  <th>
                    <button
                      data-toggle="modal"
                      data-target="#exampleModal"
                      className="btn btn-primary"
                      onClick={() => handleEditingUser(val._id)}
                    >
                      Edit
                    </button>
                  </th>
                </tr>
              </tbody>
            );
          })}
      </table>
      {/* popup */}
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
              <label>*Required</label>
              <br />
              <select onChange={(e) => setRole(e.target.value)}>
                <option>Choose...</option>
                {admin.length &&
                  admin.map((val, index) => {
                    return (
                      <option value={val.email} key={index}>
                        {val.name}
                      </option>
                    );
                  })}
              </select>
              <br />
              <label className="form-label" htmlFor="textAreaExample">
                Message
              </label>
              <div data-mdb-input-init className="form-outline">
                <textarea
                  className="form-control"
                  id="textAreaExample1"
                  placeholder="*required"
                  rows="4"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                ></textarea>
              </div>
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
                id="model-id"
                type="button"
                className="btn btn-primary"
                onClick={() => RoleOfUser(emailState.email, role, msg, setMsg)}
              >
                Sent Request
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Profile Popup */}
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
              {/* inputs goes here */}

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
                data-dismiss="model"
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

export default User;
