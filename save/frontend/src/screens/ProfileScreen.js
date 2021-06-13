import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout, update } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
//import {img } from "./logo.svg";

function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }));
  };
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name);
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {};
  }, [userInfo]);

  return (
   
    <div className="profile">
       <div><h1>Paramétre du compte </h1>
    
     
      </div> 
      <div className="profile-info p-4">
      
        <div className="form">
        
         <form onSubmit={submitHandler}>
            <ul className="form-container">
            
              <li>
                <h2>Mon Profil</h2>
              </li>
              <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {success && <div>Profil enregistré avec succès.</div>}
              </li>
              <li>
                <label htmlFor="name">Nom</label>
                <input
                  value={name}
                  type="name"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="password">Mot de passe</label>
                <input
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </li>

              <li>
                <button type="submit" className="button primary">
                  Mise à jour
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="button secondary full-width"
                >
                  Logout
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
     
    </div>
  );
}

export default ProfileScreen;
