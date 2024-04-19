import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import socket from "../../helpers/socket";
import Icon from "../Icon/Icon";
import userSettingsIcon from "../../image/settings-filled.svg";

// import closeIcon from "../assets/images/close.svg";
import { getChatList, getChat } from "../../helpers/chat";

const ENDPOINT = "http://localhost:3000";

export default function ChatList({
  name,
  chats,
  setChat,
  setChats,
  setMessages,
  // setShowUserModal,
  // showSidebar,
  // setShowSideBar,
}) {
  // const [friendUsername, setFriendUsername] = useState("");
  // const [groupName, setGroupName] = useState("")
  const [errMsg, setErrMsg] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // const [userList, setUserList] = useState([]);
  // const [showUserList, setShowUserList] = useState(false);

  // useEffect(() => {
  //   if (window.innerWidth <= 600) setIsMobile(true);
  // }, []);

  useEffect(() => {
    getChatList(name, setChats);
  }, [name]);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  const createNewChat = async (e) => {
    try {
      e.preventDefault();
      setLoading1(true);

      if (friendUsername.trim() === "") return;

      const res = await axios.post(
        ENDPOINT + "/api/chat/create/dm",
        { username: friendUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChats((prevChats) => [
        { ...res.data, chatName: friendUsername },
        ...prevChats,
      ]);
      document.querySelector(".new-dm").classList.add("hidden");
      setFriendUsername("");
      setErrMsg("");
      setLoading1(false);
    } catch (error) {
      const errMsg = error.response.data.message;
      setErrMsg(errMsg);
    }
  };

  const createNewGroup = async (e) => {
    try {
      e.preventDefault();
      setLoading2(true);

      const res = await axios.post(
        ENDPOINT + "/api/chat/create/group",
        { chatName: groupName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChats((prevChats) => [res.data, ...prevChats]);
      document.querySelector(".new-group").classList.add("hidden");
      setGroupName("");
      setLoading2(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserList = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.get(ENDPOINT + "/api/users");

      setUserList(res.data);

      console.log(res.data);
      setShowUserList(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* {showUserList && (
          <div className="modal-overlay absolute-center">
            <div className="modal absolute-center member-list flex-col gap-16">
              <Icon
                src={closeIcon}
                alt="Close user settings"
                onClick={() => setShowUserList(false)}
              />
              {userList.map((mem) => (
                <div key={mem._id} className="member">
                  <div className="avatar-container">
                    <img
                      src={mem.profilePicture}
                      alt="User avatar"
                      className="avatar"
                    />
                  </div>
                  <div className="user-info">
                    <div
                      style={{ color: `var(--${mem.color})`, fontWeight: 700 }}
                    >
                      {mem.username}
                    </div>
                    {mem.bio && (
                      <div style={{ fontWeight: 400 }}>{mem.bio}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}

      <div
        className="chat-list flex-col justify-between"
      // style={{
      //   display: `${showSidebar ? "flex" : "none"}`,
      // }}
      >
        <div className="flex-col gap-8">
          {isMobile && (
            <div style={{ alignSelf: "center" }}>
              <Icon
                src={closeIcon}
                alt="Close chat list"
                onClick={() => {
                  const list = document.querySelector(".chat-list");

                  list.classList.remove("slide-in");
                  list.classList.add("slide-out");

                  setTimeout(() => {
                    setShowSideBar(false);
                  }, 380);
                }}
              />
            </div>
          )}
          {/* <button
            type="button"
            onClick={() =>
              document.querySelector(".new-dm").classList.remove("hidden")
            }
            className="btn-submit"
          >
            New DM
          </button>
          <form className="flex-col hidden new-dm">
            <div className="input flex-col gap-4">
              <div className="flex justify-between align-center">
                <label htmlFor="name" className="required flex gap-4">
                  {"Friend's username"} <div className="error">{errMsg}</div>
                </label>
                <Icon
                  src={closeIcon}
                  alt="Close new DM input"
                  onClick={() => {
                    document.querySelector(".new-dm").classList.add("hidden");
                    setFriendUsername("");
                    setErrMsg("");
                  }}
                />
              </div>
              <input
                type="text"
                id="friend-username"
                name="friend-username"
                value={friendUsername}
                onChange={(e) => {
                  setFriendUsername(e.target.value);
                }}
              />
              <button
                onClick={createNewChat}
                className="btn-submit flex justify-center align-center"
              >
                {!loading1 ? "Create" : <div className="spinner"></div>}
              </button>
            </div>
          </form>
          <button
            type="button"
            onClick={() =>
              document.querySelector(".new-group").classList.remove("hidden")
            }
            className="btn-submit green-btn"
          >
            New Group
          </button>
          <form className="flex-col gap-16 hidden new-group">
            <div className="input flex-col gap-4">
              <div className="flex justify-between align-center">
                <label htmlFor="name" className="required flex gap-4">
                  {"Group Name"}
                </label>

                <Icon
                  src={closeIcon}
                  alt="Close new DM input"
                  onClick={() => {
                    document
                      .querySelector(".new-group")
                      .classList.add("hidden");
                    setGroupName("");
                  }}
                />
              </div>
              <input
                type="text"
                id="group-name"
                name="group-name"
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
              <button
                onClick={createNewGroup}
                className="btn-submit flex justify-center align-center"
              >
                {!loading2 ? "Create" : <div className="spinner"></div>}
              </button>
            </div>
          </form> */}
          {chats && (
            <div className="flex-col people">
              {chats.map((ch) => (
                <button
                  key={ch._id}
                  type="submit"
                  onClick={(e) => {
                    getChat(ch._id, setChat, setMessages);
                    e.target.classList.remove("unread");
                  }}
                  className="flex align-start gap-8"
                  id={ch._id}
                >
                  {ch.members[0].name === name
                    ? ch.members[1].name
                    : ch.members[0].name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="user-settings flex justify-between align-center relative">
          <div>{name}</div>
          <Icon
            src={userSettingsIcon}
            alt="User Settings"
            onClick={() => setShowUserModal(true)}
          />
        </div>
      </div>
    </>
  );
}

ChatList.propTypes = {
  username: PropTypes.string,
  token: PropTypes.string,
  setChat: PropTypes.func,
  pfp: PropTypes.string,
  setMessages: PropTypes.func,
  setShowUserModal: PropTypes.func,
  chats: PropTypes.array,
  setChats: PropTypes.func,
  showSidebar: PropTypes.bool,
  setShowSideBar: PropTypes.func,
};

export { getChat, getChatList };
