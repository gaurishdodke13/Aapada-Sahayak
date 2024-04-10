import React from "react";
import "./SideBar.scss";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Groups2Icon from "@mui/icons-material/Groups2";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar-container">
      {/* <div className="access-btn">
        <GraphicEqIcon />
        Activity Records
      </div> */}
      <div className="access-btn">
        <Link
          to="/resource"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <AddShoppingCartIcon />
          Resource Management
        </Link>
      </div>
      <div className="access-btn">
        <Link to="/review" style={{ textDecoration: "none", color: "inherit" }}>
          <NotificationsIcon />
          Review Requests
        </Link>
      </div>
      <div className="access-btn">
        <Link
          to="/request"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Groups2Icon />
          Collaborate
        </Link>
      </div>

      <div className="access-btn">
        <Link
          to="/chat-page"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ChatBubbleIcon />
          Chats
        </Link>
      </div>
    </div>
  );
};
export default SideBar;
