// RegistrationForm.js
import React, { useState } from "react";
import MapPointSelect from "./MapPointSelect";

const FillLocationOption = ({
  showMap,
  setShowMap,
  setFormData,
  formData,
  selectedLocation,
  setSelectedLocation,
  setDefalutAdd,
  defaultAdd,
}) => {
  return (
    <div>
      <div className='map-for-location-choice'>
        <MapPointSelect
          formData={formData}
          setFormData={setFormData}
          setDefalutAdd={setDefalutAdd}
          defaultAdd={defaultAdd}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>
    </div>
  );
};

export default FillLocationOption;
