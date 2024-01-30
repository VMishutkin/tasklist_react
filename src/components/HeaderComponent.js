import React from "react";
import { Link } from "react-router-dom";

export const HeaderComponment = () => {

  const logOut = () => {
    
    localStorage.removeItem("user");
    window.location.replace("/login")
  };

const loginOrLogout = () => {
  if(localStorage.getItem("user")) {
    return <li className="nav-item">
    <Link to={"/login"} className="nav-link" onClick={logOut}>
      Logout
    </Link>
  </li>
  } else {
    return <li className="nav-item">
    <Link to={"/login"} className="nav-link" >
      Login
    </Link>
  </li>
  }
}




  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          </div>          
          <div className="navbar-nav ml-auto">
            {loginOrLogout()}
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>

      </nav>
    </div>
  );
};

export default HeaderComponment;
