import React, { createContext, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast, Bounce } from "react-toastify";

const EditContext = createContext({})

export const EditionContext = ({ children }) => {
    const emailState = useSelector(state=>state.email)
    // edition options
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [exp, setExp] = useState("");
  const [salary, setSalary] = useState("");

  const [id, setId] = useState("");

   const [user, setUser] = useState([]);

   const notify = (content) => {
     toast.success(content, {
       position: "top-right",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "colored",
       transition: Bounce,
     });
  };
  const notifyErr = (content) => {
     toast.error(content, {
       position: "top-right",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "colored",
       transition: Bounce,
     });
  }
  const notifyInfo = (content) => {
   toast.info(content, {
     position: "top-left",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "colored",
     transition: Bounce,
   });
  };
  const notifyanoInfo = (content) => {
    toast.info(content, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  const notifyWar = (content) => {
    toast.warn(content, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
 async function handleEditingUser() {
   await axios
     .get(`/api/edit/getinfo/${emailState.email}`)
     .then((res) => {
       setId(res.data.message._id);
       setFName(res.data.message.firstName);
       setLName(res.data.message.lastName);
       setEmail(res.data.message.email);
       setExp(res.data.message.yearsOfExp);
       setSalary(res.data.message.salary);
     })
     .catch((err) => console.log(err.message));
 }

  async function handleSaveChanges(userId) {
        
   if (fname && lname && password && email && exp && salary) {
     if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
       notifyErr("Invalid email address");
     } else {
       let matches = '',
         matchSal = '';
       if (exp && salary) {
         matches = exp.toString().match(/\d+/g);
         matchSal = salary.toString().match(/\d+/g);
       }
       await axios.put(`/api/edit/user/${userId}`, {
           firstName: fname,
           lastName: lname,
           password,
           email,
           yearsOfExp: Number(matches[0]),
           salary: Number(matchSal[0] + matchSal[1]),
         })
         .then((res) => {
           notify('Changes saved successfully you can click on close to continue..');
         })
         .catch((err) => console.log(err.message));
     }
   } else {
     notifyWar("Input fields can't be empty");
   }
  }
   async function Details() {
     await axios
         .get(`/api/details/user/${emailState.email}`)
         .then((res) => {
           if (res.data.userDetails) {
             setUser(res.data.userDetails.reverse());
           } 
         })
         .catch((err) => console.log(err.message))
  }
  async function RoleOfUser(userEmail, adminEmail, message, setMsg) {
    if (adminEmail && message) {
      await axios.put("/api/details/userrolechange", {
          userEmail,
          adminEmail,
          message,
        })
        .then((res) => {
          setMsg("");
          if (res.data.message) {
            notifyWar(res.data.message);
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
    <EditContext.Provider
      value={{
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
        notifyErr,
        notifyInfo,
        notifyWar,
        Details,
        user,
        setUser,
        notifyanoInfo,
        RoleOfUser,
      }}
    >
      {children}
    </EditContext.Provider>
  );
}

export default EditContext