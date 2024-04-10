import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import "./Landingpage.css";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
// import images
import disasterManagementImage from "../../image/Disaster-Management.jpg";
import indiaMapImage from "../../image/indiamap.png";
import rescueImage from "../../image/rescue.png";
import apadaLogo from "../../image/apadalogo.png";
import map from "../../image/map.png";
import rescueforce from "../../image/rescueforce.png";
import communicate from "../../image/communicate.png";
import card1 from "../../image/card1.png";
import card2 from "../../image/card2.png";
import card3 from "../../image/card3.jpeg";
import card4 from "../../image/card4.png";
import card5 from "../../image/card5.jpeg";
import card6 from "../../image/card6.jpg";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

export default function Landingpage({ user }) {
  console.log(user);
  const navigate = useNavigate();
  // const [cookies, setCookie, removeCookie] = useCookies(["apadarelief"]);

  const cards = [
    {
      id: 1,
      icon: card1,
      title: "Real-Time Location-Based Insights",
      content:
        "Using GPS technology, government entities can pinpoint nearby rescue agencies on a map",
    },

    {
      id: 2,
      icon: card2,
      title: "Priority-Based Assignments",
      content:
        "Our platform automatically suggests primary and secondary rescue agencies based on preferences and availability, ensuring the best-suited responders are engaged.",
    },

    {
      id: 3,
      icon: card3,
      title: "Tailored Requests",
      content:
        "Government officials can specify the area of the disaster, the type of disaster, and send requests directly to registered rescue agencies",
    },

    {
      id: 4,
      icon: card4,
      title: "Request Management",
      content:
        "Agencies can efficiently accept or decline requests based on their capacity and expertise, optimizing resource allocation during emergencies",
    },
    // {
    //   id: 5,
    //   icon: card5,
    //   title: "Efficient Communication",
    //   content:
    //     "Built-in chatbotx facilitates direct and efficient communication between agencies, promoting coordination and information sharing.",
    // },

    {
      id: 6,
      icon: card6,
      title: "Activity Timeline",
      content:
        "Maintain a detailed record of all past activities in a blog or timeline format, helping agencies keep track of their contributions and achievements over time.",
    },
  ];

  const handleLogOut = async () => {
    const resp = await axios.get("http://localhost:3000/logout", {
      withCredentials: true,
    });
    // console.log(Cookies)

    if (resp.status == 200) {
      window.location.reload(false);
    }
    window.location.reload();
  };

  const handleSOS = async () => {
    console.log("called");
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const location = [longitude, latitude];
            const res = await axios.post(
              "http://localhost:3000/sos",
              {
                typeOfDisaster: "floods",
                latitude,
                longitude,
              },
              {
                withCredentials: true,
              }
            );
            console.log(res);
            if (res.data["error"]) {
              toast.error("SOS already sent in the past 5 hours");
            } else {
              toast.success("SOS sent successfully");
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported in this browser.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleLogOut=async ()=>{
  //   removeCookie(user);
  // }
  return (
    <>
      <ToastContainer />
      <div className='navbar'>
        <div className='logo'>
          <div className='logoLeft'>
            <Link to='/'>
              <img src={apadaLogo} alt='APADA Logo' />
            </Link>
          </div>

          <div className='line'></div>
          <div className='logoRight'>
            <p className='logoName leftText'>Aapada Sahayak</p>
            <p className='tag-line leftText'>ONE NETWORK,COUNTLESS HEROES</p>
          </div>
        </div>

        <div className='midnav'>
          <button className='status-btn1 rejected' onClick={handleSOS}>
            SOS
          </button>
        </div>

        {/* old login logout */}
        {/* <div className="buttons">
          {user && (
            <h2 className="navopt agencyname">{user.agencyDetails.name}</h2>
          )}

          {!user && (
            <>
              <Link to="/signup">
                <button className="gov-button" href="#">
                  Signup
                </button>
              </Link>

              <Link to="/rescue">
                <button className="rescue-button">Login</button>
              </Link>
            </>
          )}

          {user && (
            <div className="log-out-btn" onClick={() => handleLogOut()}>
              Logout
            </div>
          )}
        </div> */}

        <div className='buttons'>
          {user ? (
            <>
              {/* <Link
                to='/sosdash'
                className='navopt'
                style={{
                  textDecoration: "none",
                  color: "white",
                  "margin-left": "5px",
                }}
              >
                sosdashboard
              </Link> */}
              <p
                className='navopt'
                style={{ textDecoration: "none", color: "white" }}
              >
                <Link
                  to='/request'
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Request
                </Link>
              </p>
              <h2 className='navopt agencyname'>{user.agencyDetails.name}</h2>

              <div className='log-out-btn' onClick={handleLogOut}>
                Logout
              </div>
            </>
          ) : (
            <>
              <Link to='/signup'>
                <button className='gov-button'>Signup</button>
              </Link>

              <Link to='/rescue'>
                <button className='rescue-button'>Login</button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className='heroContainer'>
        <div
          className='hero'
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${disasterManagementImage})`,
            backgroundColor: "131418",
          }}
        >
          <div className='heroText'>
            <Typewriter
              options={{
                strings: [
                  '<span style="color: white;font-family: Impact, Haettenschweiler, Arial Narrow Bold, sans-serif;">WHEN DISASTER STRIKES, Aapada Sahayak RESPONDS!</span>',
                  '<span style="color: white;font-family: Impact, Haettenschweiler, Arial Narrow Bold, sans-serif;">WHEN DISASTER STRIKES, Aapada Sahayak RESPONDS!</span>',
                ], // Add your strings here
                autoStart: true, // Auto-start the typing animation
                loop: true, // Enable looping
                delay: 200, // Delay between strings (milliseconds)
                deleteSpeed: "natural", // Speed of deleting characters ('natural' provides a realistic typing effect)
              }}
              className='textColor'
            />
          </div>
          {/* <div className="textbottom">"Together we stand united for relief"</div> */}
        </div>
      </div>

      <div className='info' id='outline'>
        <div className='left-info'>
          <img className='info-img' src={map}></img>
          <img className='info-img' src={rescueImage}></img>
          <img className='info-img' src={communicate}></img>
        </div>

        <div className='right-info'>
          <div className='outline'>
            <h1
              className='aboutusTag'
              style={{ color: "#F04D1A", fontSize: "2.2em" }}
            >
              ABOUT US
            </h1>

            <div className='hrline'>_</div>

            <div className='description'>
              <h2 style={{ fontSize: "1.9em", fontWeight: "bold" }}>
                "Together we stand united for Relief."
              </h2>
              <div className='points'>
                <ul>
                  <li>Efficient Disaster Response</li>
                  <p>
                    Empowering government bodies with robust platform that
                    streamlines disaster response efforts for swift and
                    coordinated actions during crisis.
                  </p>

                  <li>Collaborative Network</li>
                  <p>
                    Agencies can collaborate with each other through our
                    platform, fostering a spirit of unity and collective action
                    for disaster relief efforts.
                  </p>

                  <li>Community Building</li>
                  <p>
                    Aapada Sahayak fosters a community of like-minded agencies
                    committed to disaster management and relief, strengthening
                    the network of support.
                  </p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='scroll'>
        <div className='card-grid'>
          {cards.map((card) => (
            <div key={card.id} className='card'>
              <div className='card-image'>
                <img src={card.icon} alt={` ${card.title}`} />
              </div>
              <div className='card-info'>
                <h2 style={{ color: "#F04D1A" }}>{card.title}</h2>
                <p style={{ color: "white" }}>{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='last' id='cont1'>
        <Footer />
      </div>
    </>
  );
}