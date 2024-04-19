import { useState } from "react";
import Icon from "../Icon/Icon";
import sendIcon from "../../image/send.svg";
import axios from "axios";
import socket from "../../helpers/socket";
import PropTypes from "prop-types";
import "./chat.css";

const ENDPOINT = "http://localhost:3000";

export default function SendMessage({ chatId, messages, setMessages, name }) {
    const [content, setContent] = useState("");

    const sendMessage = async (e) => {
        try {
            e.preventDefault();

            if (content.trim() !== "") {
                const res = await axios.post(
                    ENDPOINT + `/chat/${chatId}`,
                    {
                        content: content.trim(),
                    },
                    { withCredentials: true }
                );

                setMessages([...messages, res.data]);
                socket.emit("new-message", chatId, res.data);

                setContent("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeySubmit = (e) => {
        if (e.key === "Enter") {
            sendMessage(e);
        }
    };

    const handleSubmit = (e) => {
        sendMessage(e);
    };

    const handleTyping = (e) => {
        const text = e.target.value;
        setContent(text);

        const startTime = new Date().getTime();

        if (text !== "") {
            socket.emit("typing", name, chatId);

            setTimeout(() => {
                if (new Date().getTime() - startTime > 3000) {
                    socket.emit("stop-typing", name, chatId);
                }
            }, 3000);
        } else {
            socket.emit("stop-typing", name, chatId);
        }
    };

    return (
        <div className="send-message flex justify-start align-center">
            <form
                onKeyDown={handleKeySubmit}
                className="relative flex justify-start align-center"
            >
                <textarea
                    type="text"
                    id="send-msg"
                    name="send-msg"
                    value={content}
                    onChange={handleTyping}
                    placeholder="Send a message..."
                />
                <Icon src={sendIcon} alt="Send message" onClick={handleSubmit} />
            </form>
        </div>
    );
}

SendMessage.propTypes = {
    chatId: PropTypes.string,
    messages: PropTypes.array,
    setMessages: PropTypes.func,
    token: PropTypes.string,
    username: PropTypes.string,
};
