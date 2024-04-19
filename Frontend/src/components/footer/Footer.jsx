import react from "react";
import "./Footer.css";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillTwitterCircle,
} from "react-icons/ai";

import apadaLogo from "../../image/apadalogo.png";
import twitter from "../../image/twitter.png";
import whatsapp from "../../image/whatsapp.png";
import facebook from "../../image/facebook.png";
import instagram from "../../image/instagram.png";

export default function Footer() {
    return (
        <>
            <footer className="section bg-footer">
                <div className="footerlogo">
                    <img
                        src={apadaLogo}
                        style={{ width: "180px", height: "150", objectFit: "cover" }}
                    ></img>
                    <span
                        style={{
                            color: "white",
                            width: "300px",
                            marginLeft: "90px",
                            fontWeight: "bolder",
                        }}
                    >
                        ONE NETWORK,COUNTLESS HEROES
                    </span>
                </div>

                <div className="links">
                    <div className="useful">
                        <ul>
                            {" "}
                            <h3 style={{ color: "#F04D1A", marginBottom: "14px" }}>
                                Quick Links
                            </h3>
                            <li>
                                {" "}
                                <a href="/signup">Sign Up</a>
                            </li>
                            <li>
                                {" "}
                                <a href="/rescue">Login</a>
                            </li>
                            <li>
                                {" "}
                                <a href="#outline">About Us</a>
                            </li>
                            <li>
                                {" "}
                                <a href="/request">Send Request</a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div className="useful">
                        <ul>
                            {" "}
                            <h3 style={{ color: "#F04D1A", marginBottom: "14px" }}>
                                Useful Links
                            </h3>
                            <li>
                                {" "}
                                <a href="/signup">Terms & Conditions</a>
                            </li>
                            <li>
                                {" "}
                                <a href="/rescue">Privacy Policy</a>
                            </li>
                            <li>
                                {" "}
                                <a href="#outline">Our Team</a>
                            </li>
                            <li>
                                {" "}
                                <a href="/request">Rate Us</a>
                            </li>
                        </ul>
                    </div>

                    <div className="useful">
                        <h3 style={{ color: "#F04D1A", marginBottom: "14px" }}>
                            Contact Us
                        </h3>
                        <p style={{ color: 'white' }}>
                            Contact us if need help with anything +91-11-26701700 (Mon-Fri -
                            9:30AM-6:00PM) Control Room: +91-11-26701728 (Mon-Fri 24X7)
                        </p>
                        <img src={instagram}></img>
                        <img src={whatsapp}></img>
                        <img src={twitter}></img>
                        <img src={facebook}></img>
                    </div>
                </div>


            </footer>




        </>
    );
}
