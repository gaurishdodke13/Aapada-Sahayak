import formatTimestamp from "../../helpers/formatTimestamp";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import editIcon from "../../image/edit-filled.svg";
import axios from "axios";
import { useState } from "react";
import socket from "../../helpers/socket";

const ENDPOINT = "http://localhost:3000";

export default function Msg({
    msgId,
    chatId,
    name,
    sender,
    content,
    timestamp,
    lastMessage,
    setMessages,
}) {
    const timeString = formatTimestamp(timestamp);
    const [isEditing, setIsEditing] = useState(false);
    const [editedMsg, setEditedMsg] = useState(content);

    const startEdit = () => {
        setIsEditing(true);
    };

    const handleEdit = async (e) => {
        try {
            if (editedMsg === "") return;
            e.preventDefault();

            const res = await axios.patch(
                ENDPOINT + `/api/chat/${chatId}/messages/${msgId}`,
                { content: editedMsg },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessages((prevMsgs) => {
                const newMsgs = prevMsgs.map((msg) =>
                    msg._id === msgId ? { ...msg, content: editedMsg } : msg
                );
                return newMsgs;
            });

            socket.emit("edit-message", res.data);

            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className="msg flex-col ${name === sender ? 'sent' : 'received'}">
            {isEditing ? (
                <form
                    onSubmit={handleEdit}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            setIsEditing(false);
                            setEditedMsg(content);
                        }
                    }}
                >
                    <div className="input">
                        <input
                            type="text"
                            name="edit"
                            id="edit"
                            value={editedMsg}
                            onChange={(e) => setEditedMsg(e.target.value.trim())}
                        />
                        <button type="submit" className="hidden"></button>
                    </div>
                </form>
            ) : (
                <>
                    {(lastMessage === null ||
                        lastMessage.sender.name !== sender ||
                        new Date(timestamp).getTime() -
                        new Date(lastMessage.createdAt).getTime() >=
                        300000) && (
                            <div className="flex gap-8 justify-start align-center sender relative">
                                <div className="sender">{name === sender ? "You" : sender}</div>
                                <span className="timestamp">{timeString}</span>
                            </div>
                        )}
                    <div>{content}</div>
                    {name === sender && (
                        <Icon src={editIcon} alt="Edit message" onClick={startEdit} />
                    )}
                </>
            )}
        </div>
    );
}

Msg.propTypes = {
    msgId: PropTypes.string,
    chatId: PropTypes.string,
    username: PropTypes.string,
    sender: PropTypes.string,
    color: PropTypes.string,
    pfp: PropTypes.string,
    content: PropTypes.string,
    timestamp: PropTypes.string,
    lastMessage: PropTypes.object,
    token: PropTypes.string,
    setMessages: PropTypes.func,
};
