import React from "react";
import icon from "../../image/aapdalogo.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./MapPageHeader.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const MapPageHeader = ({ user }) => {
  const [Cookies, setCookies, removeCookies] = useCookies(["apadaRelief"]);

  const navigate = useNavigate();
  const handleLogOut = async () => {
    const resp = await axios.get("http://localhost:3000/logout", {
      withCredentials: true,
    });
    // console.log(Cookies)

    if (resp.status == 200) {
    }
    navigate("/");
  };

  console.log(user)
  return (
    <div className='header-section' style={{ 'box-shadow': '0 0 10px 0 rgb(255, 255, 255,0.3)' }}>
      <div className='header-logo'>
        <Link to='/'>
          <img src={icon} alt='' className='header-logo-image' />
        </Link>
        <div className='header-logo-text'>
          <div className='header-logo-name'>apdaRelief</div>
          <div className='header-logo-motto'>ONE NETWORK, COUNTLESS HEROES</div>
        </div>
      </div>
      <div className='Profile-container'>
        <div className='profile-name'>{user && user.agencyDetails.name}</div>
        <div className='log-out-btn' onClick={() => handleLogOut()}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default MapPageHeader;
