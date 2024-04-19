import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateData.css";
import SideBar from "../request/SideBar";
import MapPageHeader from "../request/MapPageHeader";
import Loader from "../Loader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RescueLogin from "../rescueLogin/RescueLogin";

const UpdateData = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState("");
  const [subtype, handlesubtype] = useState("");
  const [formData, setFormData] = useState({
    _id: "",
    type: "",
    name: "",
    quantity: 0,
    unit: "",
  });

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

  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const commitChanges = async (id) => {
    try {
      console.log("Identity", id);
      const updatedFormData = {
        ...formData,
        _id: id,
        name: subtype,
        type: selectedResource,
      };
      console.log(updatedFormData);
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/updateresources",
        updatedFormData,
        {
          withCredentials: true,
        }
      );
      const resources = await axios.get(apiUrl, {
        withCredentials: true,
      });
      setResources(resources.data.resources);
      closeModal();
      window.location.reload();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handletypeSelect = (e) => {
    setSelectedResource(e.target.value);
  };

  const handlesubtypechange = (e) => {
    const val = e.target.value;
    handlesubtype(val);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const apiUrl = "http://localhost:3000/getresources";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        });
        // const allObjectIds = response.data.resources.map(
        //   (resource) => resource._id
        // );
        // console.log("All Object IDs:", allObjectIds);

        setResources(response.data.resources);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (resource) => {
    setIsModalOpen(true);
    setSelectedResource(resource.type);
    handlesubtype(resource.name);
    setFormData({ ...formData, quantity: resource.quantity });
    setSelectedObjectId(resource._id);
  };

  const delrec = async (objectId) => {
    console.log(objectId);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/updateresources",
        {
          _id: objectId,
          type: "a",
          name: "a",
          quantity: 0,
          unit: "a",
          del: true,
        },
        {
          withCredentials: true,
        }
      );
      const apiUrl = "http://localhost:3000/getresources";
      // console.log(response);
      try {
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        });
        console.log(response.data);
        const allObjectIds = response.data.resources.map(
          (resource) => resource._id
        );
        console.log("All Object IDs:", allObjectIds);

        setResources(response.data.resources);
        setIsLoading(false);
        window.location.reload();
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addData = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <MapPageHeader user={user} />
      <div className={isModalOpen || isLoading ? "page_blur" : "page"}>
        <SideBar />
        <main>
          {isLoading && <Loader />}
          <div className='tab' style={{ overflowX: "auto" }}>
            <table style={{ borderRadius: "16px" }}>
              <thead>
                <tr>
                  <th>TYPE</th>
                  <th>NAME</th>
                  <th>QUANTITY</th>
                  <th>STATUS</th>
                  <th>
                    <AddCircleOutlineIcon
                      onClick={addData}
                      style={{ fontSize: 30 }}
                    />

                    {/* <button className='res' onClick={() => addData()}>
                      Add
                    </button> */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource) => (
                  <tr key={resource._id}>
                    <td>{resource.type}</td>
                    <td>{resource.name}</td>
                    <td>{resource.quantity}</td>

                    <td>
                      <button
                        className='res'
                        onClick={() => openModal(resource)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className='res'
                        onClick={() => delrec(resource._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <span className='close-btn' onClick={closeModal}>
              &times;
            </span>

            <select
              name='type'
              onChange={(e) => setSelectedResource(e.target.value)}
              value={selectedResource}
            >
              <option value='' disabled selected>Select Resource</option>
              <option>Food</option>
              <option>Rescue tools</option>
              <option>Shelter</option>
              <option>Medical</option>
            </select>

            <div className='input-section'>
              <select
                name='additionalSelect'
                onChange={(e) => handlesubtype(e.target.value)}
                value={subtype}
              >
                <option value='' selected disabled>Select Additional Option</option>
                {selectedResource && Object.keys(resourceOptions).map((type) => {
                  console.log(selectedResource)
                  if (selectedResource === type) {
                    return (
                      <optgroup key={type} label={type}>
                        {resourceOptions[type].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </optgroup>
                    );
                  }
                  return null;
                })}
              </select>

              <input
                type='number'
                className='modal_input'
                id='quantity'
                name='quantity'
                placeholder='Quantity'
                value={formData.quantity}
                onChange={handleInputChange}
              />
              {/* <input
                type='text'
                className='modal_input'
                id='unit'
                name='unit'
                placeholder='Units'
                value={formData.unit}
                onChange={handleInputChange}
              /> */}
              <button
                className='submit_data'
                onClick={() => commitChanges(selectedObjectId)}
              >
                Commit Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateData;
