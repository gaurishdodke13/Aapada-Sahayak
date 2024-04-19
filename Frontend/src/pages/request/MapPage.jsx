/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Map from "./Map";
import SideBar from "./SideBar";
import "./MapPage.scss";
import MapPageHeader from "./MapPageHeader";
import MobileHeader from "./Mobileheader";

const MapPage = ({ user }) => {

  console.log(user)

  return (
    <div className="map-page-container">
      <MapPageHeader user={user} />
      <div className="mobile-only">
        <MobileHeader />
      </div>

      <div className="column-container">
        {/* <SideBar/>
         */}

        <div className="sidebar">
          {/* Sidebar component */}
          <SideBar />
        </div>

        <Map user={user} />
      </div>
    </div>
  );
};

export default MapPage;
