import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import setAuthToken from "../utils/setAuthToken";

const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
     
    const res = await axios.post("http://localhost:4000/api/sign-in", {
      Email: email,
      Password: password,
      
    });
   
      const token = res.data.token;

      window.localStorage.setItem("token", token);
     
      setAuthToken(); //  Important set token  from res.data to get token

      history.push("/dis"); 
    } catch (error) {
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
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={(e) => onSubmit(e)}>
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

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
        <h1>{data}</h1>
        <p className="forgot-password text-right">
          Not Registered <a href="/reg">sign up?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
