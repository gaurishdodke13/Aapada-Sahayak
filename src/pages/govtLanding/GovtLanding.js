import React from "react";
import "./GovtLanding.css";
import { Link } from "react-router-dom";
import Map from "../../components/Map/Map";
import Footer from "../../components/footer/Footer";


export default function GovtLanding() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <div className="logoLeft">
            <img src={process.env.PUBLIC_URL + "images/apadalogo.png"}></img>
          </div>

          <div className="logoRight">
            <p className="logoName leftText">apadaRelief</p>
            <p className="tagline leftText">ONE NETWORK,COUNTLESS HEROES</p>
          </div>
        </div>

        <div className="midnav">
          <p className="navopt ">
            <a href="#cont1" style={{ textDecoration: "none" }}>
              Contact Us
            </a>
          </p>
          <p className="navopt">
            <a href="#cont2" style={{ textDecoration: "none" }}>
              Services
            </a>
          </p>
        </div>

        <div className="buttons">
          <p className="navopt">Govt agency name</p>
          <Link to="/">
            <button className="rescue-button" href="#">
              Log Out
            </button>
          </Link>
        </div>
      </div>

      <div className="bodyContainer">
        <Map />
      </div>



      <Footer />
    </>
  );
}
