import React from "react";
import "./RescueLogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import r1 from "../../image/r1.png";
import r2 from "../../image/r2.png";
import upleft from "../../image/upleft.png";
import upright from "../../image/upright.png";
import apadalogo from "../../image/aapdalogo.jpg";

const RescueLogin = ({ setUser }) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "1",
  });
  const [cookies, setCookie, removeCookie] = useCookies(["apadarelief"]);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(null);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error === true) {
        setLoginError(response.data.message);

        alert(response.data.message);
        window.location.reload(true);
      } else {
        setUser(response.data.user);
        setCookie("apadarelief", response.data.user, {
          maxAge: 24 * 60 * 60,
          sameSite: "none",
          secure: true,
          httpOnly: false
        });
        navigate("/request");
        // alert('Logged in succesfully');
        // console.log('Logged in succesfully');
      }
    } catch (error) {
      window.alert("Login Error: " + error.message);
      window.location.reload(true);
      console.error("Error during login:", error);
    }
  };
  return (
    <div className='outermainc'>
      <div className='left-out'>
        <div className='left-head'>
          <div className='glass-container'>
            <div className='left-glass'>
              <img
                src={apadalogo}
                style={{ width: "50px", height: "40px" }}
              ></img>
            </div>
            <p>
              <strong>apadaRelief</strong>
            </p>
          </div>

          <div className='tagline'>ONE NETWORK,COUNTLESS HEROES</div>

          <div className='glass-container2'>
            <div className='left-glass'></div>
            <p>Login Now ! Your mission awaits,Respond with Purpose</p>
          </div>
        </div>
        <div className='left-bottom'>
          <div className='up'>
            <div
              className='upLeft'
              style={{
                backgroundImage: `url(${upleft})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            ></div>

            <div
              className='upRight'
              style={{
                backgroundImage: `url(${upright})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>

          <div
            className='down'
            style={{
              backgroundImage: `url(${r1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>

      <div className="right-container">
        <div className="right-container__box">
          <div className="right-container-box">
            <h2 className="right-container__h2">WELCOME BACK!</h2>
            <p className="right-container__p">
              Enter your email and password to login in
            </p>
          </div>
          <div className='input-container'>
            <label htmlFor='email' className='right-container__label'>
              Email
            </label>

            <input
              type='text'
              className='right-container__input glass-input'
              name='email'
              placeholder='Your email address'
              value={formData.email}
              onChange={handleInputChange}
            />
            <label htmlFor='password' className='right-container__label'>
              Password
            </label>
            <input
              type='password'
              className='right-container__input glass-input'
              name='password'
              placeholder='Your password'
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <br />
          <br />

          <div className='box'>
            <button className='btn' onClick={handleSubmit}>
              LOGIN
            </button>
            <p className='right-container__bottom-text'>
              Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescueLogin;
