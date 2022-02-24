import {
    Box,
    Divider,
    FormControl,
    IconButton,
    Typography,
    TextField,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { getSender } from "../../Context/ChatLogics";
import axios from "axios";
import "./style.css";
import io from "socket.io-client";
import ScrollableChat from "./ScrollableChat";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const {
        selectedChat,
        setSelectedChat,
        user,
        notification,
        setNotification,
    } = ChatState();

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(
                `/api/message/${selectedChat._id}`,
                config
            );
            setMessages(data);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            alert("Error Occured!\nFailed to load messages");
        }
    };

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post(
                    "/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                    config
                );
                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                alert("Error Occured!\nFailed to load messages");
            }
        }
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
        // eslint-disable-next-line
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            // For notifications #doitlater
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageReceived.chat._id
            ) {
                if (!notification.includes(newMessageReceived)) {
                    setNotification([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        });
    });

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    return (
        <>
            {selectedChat ? (
                <>
                    <div className="chat-box">
                        <IconButton
                            onClick={() => setSelectedChat("")}
                            sx={{
                                display: { md: "none" },
                                color: "white",
                                paddingTop: "2px",
                            }}>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        {messages && !selectedChat.isGroupChat ? (
                            <div className="chat-name">
                                {getSender(user, selectedChat.users)}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            padding: 1,
                            bgcolor: "#e8e8e8",
                            width: "100%",
                            height: "100%",
                            borderRadius: 2,
                            overflowY: "hidden",
                        }}>
                        <div className="messages">
                            <ScrollableChat messages={messages} />
                        </div>

                        <FormControl
                            required
                            sx={{
                                mt: 1,
                            }}>
                            {istyping ? (
                                <div className="typing">Typing...</div>
                            ) : (
                                <></>
                            )}
                            <TextField
                                placeholder="Type a message"
                                sx={{
                                    bgcolor: "#e0e0e0",
                                }}
                                onChange={typingHandler}
                                value={newMessage}
                                onKeyDown={sendMessage}
                            />
                        </FormControl>
                    </Box>
                </>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                    }}>
                    <Typography variant="h2">hisca</Typography>
                    <Divider color="gray" sx={{ width: "50%", my: "0.5em" }} />
                    <Typography variant="h4">Start Messaging</Typography>
                </Box>
            )}
        </>
    );
};

export default SingleChat;
