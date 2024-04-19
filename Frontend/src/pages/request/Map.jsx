/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./mapstyle.css";
import { Icon } from "leaflet";
import icon from "../../image/location-pin.png/";
import MarkerClusterGroup from "react-leaflet-cluster";
import gpsIcon from "../../image/gps.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Request from "../../components/Request/Request";
import socket from "../../helpers/socket";
// import Request from "./Request";
import ReqBlock from "../ReqBlock.jsx";
import { Link } from "react-router-dom";
import MapRequestForm from "./MapRequestForm.jsx";
import ListSection from "./ListSection.jsx";
import { ToastContainer, toast } from "react-toastify";

const duser = {
  duser: "Ram Shirke",
  geocode: [19.10295695, 72.83745021706365],
  address: "vile parle west mumbai 400056",
  popup: "Current locations",
};

const customIcon = new Icon({
  iconUrl: icon,
  iconSize: [38, 38],
});

const duserCustomIcon = new Icon({
  iconUrl: gpsIcon,
  iconSize: [30, 30],
});

function Map({ user }) {
  const [agencies, setAgencies] = useState([]);
  const [type, setType] = useState(null);
  const [marker, setMarker] = useState(null);
  const [requestBody, setRequestBody] = useState(null);
  const [sentRequest, setSentRequest] = useState([]);
  const [recieveRequest, setRecieveRequest] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [mapClass, setMapClass] = useState(true);
  const [location, setLocation] = useState(null);
  const [subtypearray, setsubtypearray] = useState([]);
  const [filteredAgencies, setFilteredAgencies] = useState([]);

  useEffect(() => {
    // console.log(user);
    if (user) socket.emit("join-room", user._id);
  }, []);

  useEffect(() => {
    let x;
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        if (user) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const location = `${latitude},${longitude}`;
              x = setInterval(() => {
                socket.emit("update-location", user.id, location);
              }, 3000);
            },
            (error) => {
              console.error("Error getting location:", error);
            }
          );
        }
      } else {
        console.error("Geolocation is not supported in this browser.");
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    socket.on("receive-locations", (userId, newLocation) => {
      setAgencies((prev) => {
        const newAgencies = prev.map((x) => {
          if (x._id === userId)
            return {
              ...x,
              location: { type: "Point", coordinates: newLocation },
            };
          return x;
        });
        return newAgencies;
      });
    });

    return () => {
      socket.off("update-location");
    };
  }, []);

  useEffect(() => {
    if (user) {
      socket.on("receive-request", (req_data) => {
        console.log(req_data);
        toast.success("New Request Received");
        setRecieveRequest([...recieveRequest, req_data]);
        setTimeout(() => {
          setRecieveRequest(null);
        }, 300000);
      });

      socket.on("receive-message", (newMessage) => {
        console.log(newMessage);
      });

      return () => {
        socket.off("receive-request");
        socket.off("receive-message");
      };
    }
  }, []);

  useEffect(() => {
    let location;
    // Check if the Geolocation API is available in the browser
    if ("geolocation" in navigator) {
      // Get the current location
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const resp = await axios.get(
          `http://localhost:3000/getagencies?latitude=${latitude}&longitude=${longitude}&radius=30000000`,
          { withCredentials: true }
        );
        const d = resp.data;
        let myself = {
          user: user,
          location: location,
        };
        setAgencies(d);
        setLocation({ latitude, longitude });
      });
      (error) => {
        console.error("Error getting location:", error.message);
      };
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  }, []);

  //marker handle
  const handleMarker = (agency) => {
    const markerData = {
      id: agency._id,
      name: agency.name,
      address: agency.address,
      description: agency.description,
      distance: agency.distance,
      email: agency.email,
    };

    const requestBody = {
      reqAgency: markerData,
      reqduser: user,
    };

    console.log(requestBody);
    setMarker(markerData);
    setRequestBody(requestBody);
  };

  const handleRequest = () => {
    // if (user && marker) {
    //   const requestBody = {
    //     reqAgency: marker,
    //     reqduser: user,
    //   };
    //   setRequestBody(requestBody);
  };

  // console.log(agencies);
  // console.log(user);
  return (
    <div className='Map-section-columns'>
      <MapRequestForm
        subtypearray={subtypearray}
        setsubtypearray={setsubtypearray}
        agencies={agencies}
        userId={user ? user.id : null}
        filteredAgencies={filteredAgencies}
        setFilteredAgencies={setFilteredAgencies}
      />

      <div className='Map-container'>
        {recieveRequest &&
          recieveRequest.map((body, idx) => {
            return (
              <div className='receive-request-card'>
                <div className='cardbody' key={idx}>
                  <h5 className='card-title'>
                    From : {body.rescue_requester_id.name}
                  </h5>
                  <p className='card-text'>
                    Address : {body.rescue_requester_id.address}
                  </p>
                  <p className='card-text'>Distance : {body.distance} km</p>
                </div>
              </div>
            );
          })}

        <div className='option-btn'>
          <button
            className={
              mapClass
                ? "section-option-btn active"
                : "section-option-btn disable"
            }
            onClick={() => {
              setMapClass(true);
            }}
          >
            MAP
          </button>
          <button
            className={
              mapClass
                ? "section-option-btn disable"
                : "section-option-btn active"
            }
            onClick={(e) => {
              setMapClass(false);
            }}
          >
            {" "}
            LIST
          </button>
        </div>
        {requestBody && (
          <Request
            user={user}
            payload={requestBody}
            socket={socket}
            setPayLoad={setRequestBody}
            subtypearray={subtypearray}
            setsubtypearray={setsubtypearray}
          />
        )}
        <ListSection
          agencies={agencies}
          mapClass={mapClass}
          handleMarker={handleMarker}
        />
        <div className={mapClass ? "active-section" : "disable-section"}>
          {location && (
            <MapContainer
              center={[location.latitude, location.longitude]}
              zoom={7}
              onClick={(e) => console.log(e)}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
              />

              {user && location && (
                <Marker
                  position={[
                    Number(location.latitude),
                    Number(location.longitude),
                  ]}
                  key={112}
                  icon={duserCustomIcon}
                >
                  <Popup>
                    <h3>{user.email}</h3>
                    {
                      // <h5>{user.address}</h5>
                      // <h5>{user.description}</h5>
                      // <h5>{user.type}</h5>
                    }
                  </Popup>
                </Marker>
              )}

              {
                // currentUser &&
              }

              {agencies &&
                agencies.map((agency, idx) => (
                  <Marker
                    position={[
                      Number(agency.location.coordinates[1]),
                      Number(agency.location.coordinates[0]),
                    ]}
                    key={idx}
                    icon={customIcon}
                  >
                    <Popup>
                      <h3>{agency.name}</h3>
                      <h3>{agency.email}</h3>
                      <h5>{agency.address}</h5>
                      <h6>{agency.description}</h6>
                      <h6>{agency.type}</h6>
                      <h4>{agency.distance / 1000} km</h4>
                      <button
                        className='marker-btn'
                        onClick={() => handleMarker(agency)}
                      >
                        Collaborate
                      </button>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          )}
        </div>
        {
          // <button onClick={() => handleRequest()} className='body-submit-btn'>
          //   Add To Request Body
          // </button>
        }
      </div>
    </div>
  );
}

export default Map;
