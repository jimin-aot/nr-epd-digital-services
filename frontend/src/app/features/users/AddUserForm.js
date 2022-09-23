import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "./UsersSlice";
import React from "react";
import { consoleLog } from "../../helpers/utility";

const AddUserForm = () => {
  const [name, setName] =  useState("");
  const [email, setEmail] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle")

  const dispatch = useDispatch();

  const onNameChanged = (event) => setName(event.target.value);
  const onEmailChanged = (event) => setEmail(event.target.value);

  const onSaveClicked = () => {
    if (name!="" && email!="") {
      consoleLog("Name&Email",name+email)
      setAddRequestStatus('pending')
      dispatch(addNewUser({name,email})).unwrap();
      setName("")
      setEmail("")
    }
  };

  return (
    <section>
      <h2>Add New User</h2>
      <form>
        <label htmlFor="userName">User Name:</label>
        <input
          type="text"
          name="userName"
          id="userName"
          value={name}
          onChange={onNameChanged}
        ></input>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={onEmailChanged}
          >

        </input>
        <button type="button" onClick={onSaveClicked}>
          Save User
        </button>
      </form>
    </section>
  );
};

export default AddUserForm;
