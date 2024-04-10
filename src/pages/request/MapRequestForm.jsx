/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./MapRequestForm.scss";
import axios from "axios";

const MapRequestForm = ({
  subtypearray,
  setsubtypearray,
  agencies,
  userId,
  filteredAgencies,
  setFilteredAgencies,
}) => {
  const [selectedResource, setSelectedResource] = useState("");
  const [subtype, handlesubtype] = useState("");
  const [quantity, getquant] = useState(0);

  const [resources, setResources] = useState([]);
  const [bestAgencies, setBestAgencies] = useState([]);

  const resourceOptions = {
    Food: ["Food packets", "Bottled water", "Ready-to-eat meals"],
    "Rescue tools": ["Rescue personnel", "Ropes", "Ladders", "Cutting tools"],
    Shelter: ["Tents", "Beds"],
    Medical: [
      "First aid kits",
      "Pain relievers",
      "Ambulances",
      "Medical personnel",
      "Stretchers",
    ],
  };

  // useEffect(() => {
  //   console.log("subtypearray:", subtypearray);
  // }, [subtypearray]);

  return (
    <div className='req_form'>
      <h2>Your Request</h2>
      <div className='req_form_box'>
        <div className='input-section'>
          <div className='input-title'>
            <h4>Select resource type</h4>
          </div>
          <select
            name='type'
            onChange={(e) => {
              setSelectedResource(e.target.value);
            }}
            value={selectedResource}
          >
            <option value=''>Select Resource</option>
            <option value='Food'>Food</option>
            <option value='Rescue tools'>Rescue tools</option>
            <option value='Shelter'>Shelter</option>
            <option value='Medical'>Medical</option>
          </select>
        </div>

        <div className='input-section'>
          <h4>Select resource Subtype:</h4>
          <select
            name='additionalSelect'
            onChange={(e) => handlesubtype(e.target.value)}
            value={subtype}
          >
            <option value=''>Select sub type</option>
            {selectedResource &&
              resourceOptions[selectedResource].map((val, idx) => {
                return (
                  <option value={val} key={idx}>
                    {val}
                  </option>
                );
              })}
          </select>
          <br />

          <div className='input-section'>
            Quantity
            <input
              type='number'
              value={quantity}
              onChange={(e) => getquant(e.target.value)}
            />
          </div>
        </div>
        <br />
        <button
          className='submit_data'
          onClick={async () => {
            if (selectedResource === "" || subtype === "" || quantity === 0) {
              alert("Please enter a valid request");
            } else {
              setsubtypearray([
                ...subtypearray,
                {
                  type: selectedResource,
                  name: subtype,
                  qty: quantity,
                },
              ]);
            }
            const currentSubtypearray = [
              ...subtypearray,
              {
                type: selectedResource,
                name: subtype,
                qty: quantity,
              },
            ];
            // const matchingAgencies = agencies.filter((agency) => {
            //   return subtypearray.every((requiredResource) => {
            //     return agency.resources.some((agencyResource) => {
            //       return (
            //         agencyResource.type === requiredResource.name &&
            //         agencyResource.name === requiredResource.type &&
            //         agencyResource.quantity >= requiredResource.qty
            //       );
            //     });
            //   });
            // });

            // console.log(matchingAgencies);

            // const bestAgencies = await axios.get(
            //   "http://localhost:3000/getagencies/best",
            //   subtypearray
            // );

            setSelectedResource("");
            handlesubtype("");
            getquant("");

            // filtering agencies
            console.log(agencies[0].resources)
            const temp2 = agencies.filter((agency, idx) => {
              console.log("subtype array length", currentSubtypearray.length);
              const temp = { ...(agency.resources) };
              console.log(agency);
              const tempKeys = new Set(Object.keys(temp));
              for (let i = 0; i < currentSubtypearray.length; i++) {
                for (let j in currentSubtypearray[i]) {
                  if (!(j in temp)) {
                    return false;
                  } else {
                    if (temp[j] < currentSubtypearray[i][j]) {
                      return false;
                    } else {
                      temp[j] -= currentSubtypearray[i][j];
                    }
                  }
                }
              }
              return true;
            });

            setFilteredAgencies(temp2);
            console.log("filtered agencies");
            console.log(temp2);
          }}
        >
          Add Resource
        </button>

        <div className='input-section'>
          <h4>Requested resources</h4>
          <p>
            <table>
              <thead>
                <td>Type</td>
                <td>Name</td>
                <td>Quantity</td>
              </thead>
              {subtypearray &&
                subtypearray.map((arr) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{arr.type}</td>
                        <td>{arr.name}</td>
                        <td>{arr.qty}</td>
                      </tr>
                    </tbody>
                  );

                  // <div
                  //   style={{ display: "flex", justifyContent: "space-around" }}
                  // >
                  //   <p>{arr.type}</p>
                  //   <p>{arr.name}</p>
                  //   <p>{arr.qty}</p>
                  // </div>
                })}
            </table>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapRequestForm;
