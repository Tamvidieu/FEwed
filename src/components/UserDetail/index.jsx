import React, { useState, useEffect, useContext } from "react";

import "./styles.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../AppContext/contextProvider";
import UploadImg from "./UploadImg";
import Loading from "../Loading/Loading";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const userId = useParams();
  const {user} = useContext(MyContext)
  const [userInfor, setUserInfor] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchUser = async () => {
      const headers = { 'Authorization': `Bearer ${token}` };
      try{
        const res = await axios.get(
          `https://2czvz4-8080.csb.app/api/user/${userId.userId}`,
          {headers: headers}
        );
        setUserInfor(res.data);
        setLoading(false)
      } catch(e){
        console.error(`error to fetch user with id ${userId.userId}`,e)
        setLoading(false)
      }
    };
    fetchUser();
  }, [userId]);

  if(loading){
    return (<Loading />)
  }

  return (
    <div className="user">
      {(user._id === userId.userId) 
        && <UploadImg />
      }
      <div className="user-detail-container">
        <h2 className="item-center">User Information</h2>
        <div className="item-center">
          <span style={{ fontWeight: "bold", fontSize: "30px" }}>
            {userInfor.first_name}
          </span>
        </div>
        <p className="user-detail">
          <span className="label">ID: </span>
          {userInfor._id}
        </p>
        <p className="user-detail">
          <span className="label">First Name: </span>
          {userInfor.first_name}
        </p>
        <p className="user-detail">
          <span className="label">Last Name: </span>
          {userInfor.last_name}
        </p>
        <p className="user-detail">
          <span className="label">Location: </span>
          {userInfor.location}
        </p>
        <p className="user-detail">
          <span className="label">Description: </span>
          {userInfor.description}
        </p>
        <p className="user-detail">
          <span className="label">Occupation: </span>
          {userInfor.occupation}
        </p>
        <Link to={`/photos/${userId.userId}`} className="item-center link">
          Photos shared by {userInfor.first_name}
        </Link>
      </div>
    </div>
  );
}

export default UserDetail;
