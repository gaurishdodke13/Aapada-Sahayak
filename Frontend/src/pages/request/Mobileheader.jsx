// MobileHeader.js
import React, { useState } from "react";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Groups2Icon from "@mui/icons-material/Groups2";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import "./Mobileheader.css";

const MobileHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mobile-header-container">
      {/* <div className="access-btn"><GraphicEqIcon />Activity Records</div>
      <div className="access-btn">
        <Link to='/resource' style={{ textDecoration: 'none', color: 'inherit' }}>
          <AddShoppingCartIcon />Resource
        </Link>
      </div>
      <div className="access-btn">
        <Link to='/review' style={{ textDecoration: 'none', color: 'inherit' }}>
          <NotificationsIcon />Review Requests
        </Link>
      </div>
      <div className="access-btn">
        <Link to='/request' style={{ textDecoration: 'none', color: 'inherit' }}>
          <Groups2Icon />Collaborate
        </Link>
      </div> */}
      <div className="menu-option">
        <IconButton
          aria-controls="options-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="options-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link
              to="/activity"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <GraphicEqIcon /> Activity Records
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link
              to="/resource"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <AddShoppingCartIcon /> Resource
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link
              to="/review"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NotificationsIcon /> Review Requests
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link
              to="/request"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Groups2Icon /> Collaborate
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default MobileHeader;
