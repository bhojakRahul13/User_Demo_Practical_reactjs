import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = () => {
  let history = useHistory();
  const [first_Name, setFirst_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_No, setPhone_No] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState(""); //TO Store data message



  const onSubmit = async (e) => {
    e.preventDefault();
  try {
    
    const res = await axios.post("http://localhost:4000/api/sign-up", {

    First_Name: first_Name,
    Last_Name: last_Name,
    Email: email,
    Password: password,
    Phone_No: phone_No,
    Address: address

  });
  console.log("res", res);

  history.push("/");
}  catch (error) {
  if(error.response) {
    setData(error.response.data.msg)
  } else {
    setData(error.message);
  }

}    
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Register Form</h2>
        <form onSubmit={(e) => onSubmit(e)}>
         
        <div className="form-group">
            <input
              type="text"
              name="first_name"
              className="form-control form-control-lg"
              placeholder="First_Name"
              value={first_Name}
              onChange={(e) => setFirst_Name(e.target.value)}
            />
          </div>

        <div className="form-group">
            <input
              type="text"
              name="last_name"
              className="form-control form-control-lg"
              placeholder="Last_name"
              value={last_Name}
              onChange={(e) => setLast_Name(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control form-control-lg"
              name="Passord"
              placeholder="Enter Your Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              name="Phone_No"
              placeholder="Enter Your Phone Number"
              value={phone_No}
              onChange={(e) => setPhone_No(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              name="Address"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>

        <h1>{data}</h1>
        <p className="forgot-password text-right">
          Already registered <a href="/">sign in?</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
