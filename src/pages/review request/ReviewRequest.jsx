import React, { useState } from "react";
import axios from "axios";
import "./ReviewRequest.scss";
import SideBar from "../request/SideBar";
import MapPageHeader from "../request/MapPageHeader";
import { useContext } from "react";
import reviewContext from "../../context/ReviewRequestContext_old.jsx";
import { useEffect } from "react";
import socket from "../../helpers/socket.js";
// import chatIcon from "../../image/chat.svg";
import { Link } from "react-router-dom";

const ENDPOINT = "http://localhost:3000";

const ReviewRequest = ({
  user,
  setChat,
  setChats,
  chats,
  chat,
  setMessages,
  messages,
}) => {
  const [sentSection, setSentSection] = useState(true);
  const { reviewData, setReviewData } = useContext(reviewContext);
  const [sentRequests, setSentRequests] = useState([]);
  const [rcvdRequests, setRcvdRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    console.log(sentRequests);
    socket.on("responded-to-request", (reqId, newStatus) => {
      console.log("hello");
      setSentRequests((prev) => {
        const newarray = prev.map((item) => {
          if (item._id === reqId) return { ...item, status: newStatus };
          return item;
        });
        console.log(newarray);
        return newarray;
      });
    });

    return () => {
      socket.off("responded-to-request");
    };
  }, []);

  useEffect(() => {
    const fetchReviewRequest = async () => {
      const [sentResp, receivedResp] = await Promise.all([
        axios.get("http://localhost:3000/getsentrequests", {
          withCredentials: true,
        }),
        axios.get("http://localhost:3000/getreceivedrequests", {
          withCredentials: true,
        }),
      ]);
      console.log(sentResp.data.requests);
      setSentRequests(sentResp.data.requests.reverse());
      setRcvdRequests(receivedResp.data.requests.reverse());
      // console.log(sentResp.data.requests);
      setSentRequests(sentResp.data.requests);
      setRcvdRequests(receivedResp.data.requests);
    };

    fetchReviewRequest();
  }, []);

  const handleViewRequest = (requestId) => {
    setSelectedRequestId(requestId);
    setIsModalOpen(true);
  };

  const handleStatusChange = (e, reqId, requesterId, status) => {
    try {
      e.preventDefault();
      const ind = rcvdRequests.findIndex((x) => x._id === reqId);
      setRcvdRequests((prev) => {
        const newarray = prev.map((p, i) => {
          if (i === ind) return { ...p, status: status };
          return p;
        });

        return newarray;
      });

      socket.emit("respond-to-request", requesterId, reqId, status);
    } catch (error) {
      console.log(error);
    }
  };

  const goToChat = async (rescue_id1, rescue_id2) => {
    const res = await axios.get(ENDPOINT + "/findchat", {
      rescue_id1,
      rescue_id2,
    });
    if (!res.data) {
      const res = await axios.post(ENDPOINT + "/chat", {
        rescue_id1,
        rescue_id2,
      });
      setChat(res.data);
      setMessages([]);
    } else {
      setChat(res.data.chat);
      setChats((prev) => [...prev, res.data.chat]);
    }
  };
  console.log(user)
  return (
    <div>
      <MapPageHeader user={user} />
      <div className="review-request-container">
        <div className="siderectangle">
          <SideBar />
        </div>

        <div className="section">
          <div className="btn-section">
            <button
              className={
                sentSection ? "review-btn active-btn" : "review-btn disable-btn"
              }
              onClick={() => setSentSection(true)}
            >
              Sent
            </button>
            <button
              className={
                sentSection ? "review-btn disable-btn" : "review-btn active-btn"
              }
              onClick={() => setSentSection(false)}
            >
              Received
            </button>
          </div>

          <div className="review-section">
            <div
              className={
                sentSection
                  ? "sent-section active-section"
                  : "sent-section disable-section"
              }
            >
              <div>
                {sentRequests &&
                  sentRequests.map((recieve, idx) => {
                    return (
                      <div className="request-card">
                        <div className="agency-info">
                          <p>
                            To:{" "}
                            {recieve.requestee_id && recieve.requestee_id.name}
                          </p>
                          <p>
                            From:{" "}
                            {recieve.rescue_requester_id
                              ? recieve.rescue_requester_id.name
                              : recieve.govt_requester_id.name}
                          </p>
                        </div>
                        {
                          <div className="time-info">
                            <p>
                              On: {new Date(recieve.createdAt).toLocaleString()}
                            </p>
                            {recieve.updatedAt != recieve.createdAt && (
                              <p>
                                Updated At:{" "}
                                {new Date(recieve.updatedAt).toLocaleString()}
                              </p>
                            )}
                          </div>
                        }

                        <div className="status-info">
                          {(recieve.status === "Accepted" ||
                            recieve.status === "Completed")
                            //   && (
                            //   <button
                            //     onClick={() =>
                            //       goToChat(
                            //         recieve.rescue_requester_id,
                            //         recieve.requestee_id
                            //       )
                            //     }
                            //   >
                            //     Chat
                            //   </button>
                            // )
                          }
                          <button
                            className={`status-btn ${recieve.status.toLowerCase()}`}
                          >
                            {recieve.status}
                          </button>
                          <button
                            className={`status-btn ${recieve.status.toLowerCase()}`}
                            onClick={() => handleViewRequest(recieve._id)}
                          >
                            View Request
                          </button>
                          {isModalOpen && selectedRequestId === recieve._id && (
                            <div className="modal-req">
                              <div className="modal-req-box">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Type</th>
                                      <th>Subtype</th>
                                      <th>Quantity</th>
                                    </tr>
                                  </thead>
                                  {recieve.requested_items.map((item, idx) => (
                                    <tr>
                                      <th>{item.type}</th>
                                      <th>{item.name}</th>
                                      <th>{item.qty}</th>
                                    </tr>
                                  ))}
                                </table>

                                <button
                                  className="close"
                                  onClick={() => setIsModalOpen(false)}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div
              className={
                sentSection
                  ? "Recive-section disable-section"
                  : "Recive-section active-section"
              }
            >
              {
                <div>
                  {rcvdRequests &&
                    rcvdRequests.map((recieve, idx) => (
                      <div className="request-card">
                        <p>
                          On: {new Date(recieve.createdAt).toLocaleString()}
                        </p>
                        <div className="flex flex-col">
                          <p>
                            To:{" "}
                            {recieve.requestee_id.name &&
                              recieve.requestee_id.name}
                          </p>
                          <p>
                            From:{" "}
                            {recieve.rescue_requester_id &&
                              recieve.rescue_requester_id.name
                            }
                          </p>
                        </div>
                        {recieve.status !== "Pending" ? (
                          <div className="status-info">
                            {(recieve.status === "Accepted" ||
                              recieve.status === "Completed")
                              // && (
                              // <button
                              //   onClick={() =>
                              //     goToChat(
                              //       recieve.rescue_requester_id,
                              //       recieve.requestee_id
                              //     )
                              //   }
                              // >
                              //   Chat
                              // </button>
                              // )
                            }
                            <button
                              className={`status-btn ${recieve.status.toLowerCase()}`}
                            >
                              {recieve.status}
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-4">
                            <button
                              className="status-btn completed"
                              onClick={(e) =>
                                handleStatusChange(
                                  e,
                                  recieve._id,
                                  recieve.rescue_requester_id._id,
                                  "Accepted"
                                )
                              }
                            >
                              Accept
                            </button>

                            <button
                              className="status-btn rejected"
                              onClick={(e) =>
                                handleStatusChange(
                                  e,
                                  recieve._id,
                                  recieve.rescue_requester_id._id,
                                  "Rejected"
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        <button
                          className={`status-btn ${recieve.status.toLowerCase()}`}
                          onClick={() => handleViewRequest(recieve._id)}
                        >
                          View Request
                        </button>
                        <br />
                        {isModalOpen && selectedRequestId === recieve._id && (
                          <div className="modal-req">
                            <div className="modal-req-box">
                              <table>
                                <thead>
                                  <tr>
                                    <th>Type</th>
                                    <th>Subtype</th>
                                    <th>Quantity</th>
                                  </tr>
                                </thead>
                                {recieve.requested_items.map((item, idx) => (
                                  <tr>
                                    <th>{item.type}</th>
                                    <th>{item.name}</th>
                                    <th>{item.qty}</th>
                                  </tr>
                                ))}
                              </table>
                            </div>

                            <button
                              className="close"
                              onClick={() => setIsModalOpen(false)}
                            >
                              Close
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewRequest;
