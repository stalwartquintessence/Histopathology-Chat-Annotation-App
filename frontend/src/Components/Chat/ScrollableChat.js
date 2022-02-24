import { Avatar, Tooltip } from "@mui/material";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../../Context/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();

    return (
        <ScrollableFeed className="message-box">
            {messages &&
                messages.map((m, i) => (
                    <div
                        style={{ display: "flex", alignItems: "center" }}
                        key={m._id}>
                        {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                            <Tooltip title={m.sender.name}>
                                <Avatar
                                    sx={{
                                        bgcolor: "#161b22",
                                        width: 30,
                                        height: 30,
                                    }}>
                                    {m.sender.name.toString()[0].toUpperCase()}
                                </Avatar>
                            </Tooltip>
                        )}
                        <span
                            style={{
                                boxShadow: "0px 0px 15px rgba(75, 75, 75, 0.5)",
                                backgroundColor: `${
                                    m.sender._id === user._id
                                        ? "whitesmoke"
                                        : "#18191c"
                                }`,
                                color: `${
                                    m.sender._id === user._id
                                        ? "black"
                                        : "white"
                                }`,
                                borderRadius: "20px",
                                padding: "4px 10px 7px 10px",
                                maxWidth: "75%",
                                fontSize: "1.1em",
                                marginLeft: isSameSenderMargin(
                                    messages,
                                    m,
                                    i,
                                    user._id
                                ),
                                marginTop: isSameUser(messages, m, i, user._id)
                                    ? 3
                                    : 4,
                            }}>
                            {m.content}
                        </span>
                    </div>
                ))}
        </ScrollableFeed>
    );
};

export default ScrollableChat;
