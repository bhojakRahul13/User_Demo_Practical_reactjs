import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import setAuthToken from "../utils/setAuthToken";

const Display = () => {
  const history = useHistory();

  const [users, setUser] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      history.push("/");
    }
    loadUsers();
  }, []); //[] is for runiing only 1 time

  const loadUsers = async () => {
    setAuthToken(); //  Important set token  from res.data to get token

    const result = await axios.get("http://localhost:4000/api/display");
    console.log(result);
    setUser(result.data.user);
  };

  const deleteUser = async (id) => {
    await axios.get(`http://localhost:4000/api/delete/${id}`);
    console.log("front end  delete");
    loadUsers();
  };

  return (
    <div className="container">
      
      <div className="py-4">
        <h1>All Users Page !</h1>
        
				
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First_Name</th>
              <th scope="col">Last_Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone_No</th>
              <th scope="col">Address</th>
              <th>Action</th>
       <th>       <Link to='/reg'>
									<button className='btn btn-primary' type='button'>
										Add User
									</button>
								</Link>
                </th>
            </tr>

          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.First_Name} </td>
                <td>{user.Last_Name} </td>
                <td>{user.Email} </td> 
                <td>{user.Phone_No} </td>
                <td>{user.Address} </td>
                <td>
                  <Link
                    className="btn btn-primary  mr-2"
                    to={`/user/${user._id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-success  mr-2"
                    to={`/edit/${user._id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
              
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button>
        <div
                  
          onClick={() => {
                    localStorage.removeItem("token");
                    history.push("/");
                  }}
                >
                  <h2>Logout</h2>
             
                </div>
        </button>
      </div>
    </div>
  );
};

export default Display;
