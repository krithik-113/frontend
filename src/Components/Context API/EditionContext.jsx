import React, { createContext, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

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
 async function handleEditingUser(id) {
   await axios
     .get(
       `https://backend-tpel.onrender.com/api/edit/getinfo/${emailState.email}`
     )
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
        let matches = exp.match(/\d+/g) 
        let matchSal = salary.match(/\d+/g) 
   if (fname && lname && password && email && exp && salary) {
     if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
       alert("Invalid email address");
     } else {
       await axios
         .put(`https://backend-tpel.onrender.com/api/edit/user/${userId}`, {
           firstName: fname,
           lastName: lname,
           password,
           email,
           yearsOfExp: Number(matches[0]),
           salary: Number(matchSal[0] + matchSal[1]),
         })
         .then((res) => {
           alert(res.data.message);
           window.location.reload();
         })
         .catch((err) => console.log(err.message));
     }
   } else {
     alert("Input fields can't be empty");
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
        id
      }}
    >
      {children}
    </EditContext.Provider>
  );
}

export default EditContext