import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import ChatBoxHeader from "./ChatBoxHeader";
import Messages from "./Messages.jsx";
import SendMessage from "./SendMessage.jsx";
import socket from "../../helpers/socket.js";

export default function ChatBox({
    chat,
    messages,
    setMessages,
    name,
    setShowGroupModal,
    setShowSideBar,
}) {
    const [isTyping, setIsTyping] = useState(false);
    const [typers, setTypers] = useState([]);
    console.log(chat);

    useEffect(() => {
        socket.on("receive-message", (newMsg, msg_chatId) => {
            if (msg_chatId === chat._id)
                setMessages((prevMsgs) => [...prevMsgs, newMsg]);
            else document.getElementById(newMsg.chat).classList.add("unread");
        });

        socket.on("receive-edited-message", (newMsg) => {
            if (newMsg.chat === chat._id) {
                setMessages((prevMsgs) => {
                    const newMsgs = prevMsgs.map((msg) =>
                        msg._id === newMsg._id ? newMsg : msg
                    );
                    return newMsgs;
                });
            }
        });

        socket.on("is-typing", (typer, chatId) => {
            if (chatId === chat._id) {
                setTypers((prevTypers) => {
                    const isAlreadyTyping = prevTypers.find((t) => t === typer);
                    if (!isAlreadyTyping) return [...prevTypers, typer];
                    return prevTypers;
                });
                setIsTyping(true);
            }
        });

        socket.on("isnt-typing", (typer, chatId) => {
            if (chatId === chat._id) {
                setTypers([]);
                setIsTyping(false);
            }
        });

        return () => {
            socket.off("receive-message");
            socket.off("is-typing");
            socket.off("isnt-typing");
        };
    }, [chat]);

    return (
        chat && (
            <div className="chat-box-overlay grid">
                <Messages
                    messages={messages}
                    isTyping={isTyping}
                    typers={typers}
                    name={name}
                    setMessages={setMessages}
                    chatId={chat._id}
                />
                <SendMessage
                    chatId={chat._id}
                    messages={messages}
                    name={name}
                    setMessages={setMessages}
                />
            </div>
        )
    );
}

ChatBox.propTypes = {
    chat: PropTypes.object,
    messages: PropTypes.array,
    setMessages: PropTypes.func,
    token: PropTypes.string,
    username: PropTypes.string,
    setShowGroupModal: PropTypes.func,
    setShowSideBar: PropTypes.func,
};
