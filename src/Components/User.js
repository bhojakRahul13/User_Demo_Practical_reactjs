import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


const User = () => {
  const [first_Name, setFirst_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_No, setPhone_No] = useState("");
  const [address, setAddress] = useState("");
  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:4000/api/user/${id}`);
    setFirst_Name(result.data.users.First_Name);
    setLast_Name(result.data.users.Last_Name);
    setEmail(result.data.users.Email);
    setPhone_No(result.data.users.Phone_No);
    setAddress(result.data.users.Address);
  };

  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/dis">
        back to Home
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
      <li className="list-group-item">first_name: {first_Name}</li>
      <li className="list-group-item">last_Name: {last_Name}</li>
      <li className="list-group-item">email: {email}</li>
      <li className="list-group-item">phone: {phone_No}</li>
      <li className="list-group-item">address: {address}</li>
      </ul>
    </div>
  );
};

export default User;
