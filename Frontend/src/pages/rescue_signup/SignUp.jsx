import React, { useState } from "react";
import "./SignUp.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apadalogo from "../../image/aapdalogo.jpg";
import rescueimg from "../../image/Rsignup.png";
import signup from "../../image/signupimg.png";
import signupleft from "../../image/signupLeft.png";
import signupright from "../../image/signupright.png";
import FillLocationOption from "./FillLocationOption";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";

const SignUp = ({ setUser }) => {
  const navigate = useNavigate();
  const [sentOtp, setSentOtp] = useState(false);
  const [wrongOTP, setWrongOTP] = useState(false);
  const [resendOTP, setResendOTP] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    description: "",
    phonesNumbers: [],
    address: "",
    type: "",
  });
  const [error, setError] = useState(null);
  const [showMap, setShowmap] = useState(true);
  const [defaultAdd, setDefalutAdd] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["apadarelief"]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = `${latitude},${longitude}`;
          setFormData({
            ...formData,
            location: location,
          });



        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error(`Error getting location ${error}`)
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
      toast.error('Geolocation is not supported in this browser')
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleOTP = async (e) => {
    try {
      toast.success('OTP SENT')
      e.preventDefault();
      const resp = await axios.post("http://localhost:3000/signup/otp", {
        email: formData.email,
      });

      console.log(resp)

      setSentOtp(true);
    } catch (error) {
      console.log(error);
      setSentOtp(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Form Data:", formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.error === false) {
        setSentOtp(true)
        toast.success("Registered Successfully !!");
        setUser(response.data.user);
        setCookie("apadarelief", response.data.user, {
          maxAge: 24 * 60 * 60,
          sameSite: "none",
          secure: true,
          httpOnly: false
        });
        navigate("/request");
      }
      else {

        if (response.data.message === 'OTP expired' || response.data.message === 'Incorrect OTP') {
          console.log("ERROR")
          toast.error(response.data.message);
          setSentOtp(false)
        }
        else {
          console.log("ERROR in ")
          toast.error(response.data.message);
          setError(response.data.message);
        }

        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (error) {
      if (error) {
        setSentOtp(false);
      }
      // window.alert("Login Error: " + error.message);
      toast.error("Login Error: " + error.message)
      // window.location.reload(false);
      // console.error("Error during signup:", error);
    }
  };

  const handleAddPhone = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phonesNumbers: [...prevFormData.phonesNumbers, ""], // Add an empty string for a new phone number
    }));
  };

  const handleRemovePhone = (indexToRemove) => {
    const updatedPhones = formData.phonesNumbers.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData({
      ...formData,
      phonesNumbers: updatedPhones,
    });
  };

  const handlePhoneChange = (e, index) => {
    const updatedPhones = [...formData.phonesNumbers];
    updatedPhones[index] = e.target.value;
    setFormData({
      ...formData,
      phonesNumbers: updatedPhones,
    });
  };

  const resetToDefault = async (e) => {
    e.preventDefault()
    console.log(defaultAdd)
    const { lat, lng } = defaultAdd.location
    const address = defaultAdd.address
    setSelectedLocation({ lat, lng })
    setFormData({ ...formData, address: address, location: `${lat},${lng}` })
  }


  return (
    <div className="main-box">
      <ToastContainer />
      <FillLocationOption
        showMap={showMap}
        setShowMap={setShowmap}
        formData={formData}
        setFormData={setFormData}
        setDefalutAdd={setDefalutAdd}
        defaultAdd={defaultAdd}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      {
        // <div className="left">
        //   <div className="left-head">
        //     <div className="glass-container">
        //       <div className="left-glass">
        //         <img
        //           src={apadalogo}
        //           style={{ width: "50px", height: "40px" }}
        //         ></img>
        //       </div>
        //       <p>
        //         <strong>apadaRelief</strong>
        //       </p>
        //     </div>
        //     <div className="tagline">ONE NETWORK,COUNTLESS HEROES</div>
        //     <div className="glass-container2">
        //       <div className="left-glass"></div>
        //       <p>
        //         <strong>Register and Connect with our community</strong>
        //       </p>
        //     </div>
        //     <div className="left-bottom">
        //       <div className="up">
        //         <div
        //           className="upLeft"
        //           style={{
        //             backgroundImage: url(${signupleft}),
        //             backgroundSize: "cover",
        //             backgroundPosition: "center",
        //             backgroundRepeat: "no-repeat",
        //           }}
        //         ></div>
        //         <div
        //           className="upRight"
        //           style={{
        //             backgroundImage: url(${signupright}),
        //             backgroundSize: "cover",
        //             backgroundPosition: "center",
        //             backgroundRepeat: "no-repeat",
        //           }}
        //         ></div>
        //       </div>
        //       <div
        //         className="down"
        //         style={{
        //           backgroundImage: url(${signup}),
        //           backgroundSize: "cover",
        //           backgroundPosition: "center",
        //           backgroundRepeat: "no-repeat",
        //         }}
        //       ></div>
        //     </div>
        //   </div>
        // </div>
      }

      <div className="right">
        <div className="contact">
          <form>
            <div className="right-box">
              <p>
                <label>Name </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name of your organisation"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email id"
                />
              </p>
              <p>
                <label htmlFor="otp">OTP</label>
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  placeholder="Enter OTP here"
                />
              </p>
              <p>
                <label>Password </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Set a strong password"
                />
              </p>

              <div>
                <label>Address </label>
                <div className="address-container">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your postal address"
                    className="Address-input"
                  />
                  <div className="choose-from-map" onClick={e => resetToDefault(e)}>RESET</div>
                </div>
              </div>
            </div>

            <div className="mid">
              <p>
                <label>Select your Category:</label>
                <select
                  name="type"
                  className="drop"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="NDRF">NDRF</option>
                  <option value="SDRF">SDRF</option>
                  <option value="DDRF">DDRF</option>
                  <option value="NGO">NGO</option>
                </select>
              </p>
              <p>
                <label>Enter phone number:</label>
                {formData.phonesNumbers.map((phone, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name={`phone${index}`}
                      value={phone}
                      onChange={(e) => handlePhoneChange(e, index)}
                      placeholder="Enter a phone number"
                    />
                    <button
                      className="removebtn"
                      onClick={() => handleRemovePhone(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  className="addbtn"
                  type="button"
                  onClick={handleAddPhone}
                >
                  Add Contact No.
                </button>
              </p>
            </div>

            <p className="full">
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                placeholder="Decscribe your organisation in less than 50 words"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </p>
            <p>
              {!sentOtp ? (
                <button className="registerbtn" onClick={handleOTP}>
                  Receive OTP
                </button>
              ) :
                (
                  <button className="registerbtn" onClick={handleSubmit}>
                    REGISTER
                  </button>
                )
              }
            </p>
          </form>
        </div>

      </div>
      {error && <div>{error}</div>}

    </div>
  );
};

export default SignUp;