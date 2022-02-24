import { Box, IconButton, Stack, Typography } from "@mui/material";
import SearchOutlined from "@mui/icons-material/Search";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { getSender } from "../../Context/ChatLogics";
import UserListItem from "./UserListItem";

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const { selectedChat, setSelectedChat, user, chats, setChats } =
        ChatState();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get("/api/chat/", config);
            // console.log(data);
            setChats(data);
        } catch (error) {
            alert("Errored Occured!\nFailed to load the chat.");
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, [fetchAgain]);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(
                `/api/user?search=${search}`,
                config
            );
            setSearchResult(data);
        } catch (error) {
            alert("Error Occured!\nFailed to Load the Search Results");
            return;
        }
    };

    const accessChat = async (userId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id))
                setChats([data, ...chats]);
            setSelectedChat(data);
            setSearch("");
            setSearchResult([]);
        } catch (error) {
            alert("Error fetching the chat");
        }
    };

    return (
        <Box
            sx={{
                color: "white",
                display: { xs: selectedChat ? "none" : "flex", md: "flex" },
                flexDirection: "column",
                bgcolor: "#161b22",
                width: { xs: "100%", md: "40%", lg: "30%" },
                marginRight: { xs: 0, md: 0.2 },
                padding: 2,
                height: "100%",
            }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <Typography variant="h4">Chats</Typography>
            </Box>
            <div className="search-user">
                <IconButton disabled>
                    <SearchOutlined />
                </IconButton>
                <form onSubmit={handleSearch}>
                    <input
                        id="search-user"
                        placeholder="Search user"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>
            <div className="users-list">
                {searchResult?.map((user) => (
                    <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => accessChat(user._id)}
                    />
                ))}
            </div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    borderRadius: "8px",
                    overflowY: "auto",
                }}>
                {chats ? (
                    <Stack>
                        {chats.map((chat) => (
                            <div
                                key={chat._id}
                                onClick={() => setSelectedChat(chat)}>
                                <div
                                    className={
                                        selectedChat === chat
                                            ? "chat-selected"
                                            : "chat"
                                    }>
                                    <Typography
                                        key={chat._id}
                                        sx={{
                                            fontSize: "1.2em",
                                            marginLeft: 1,
                                        }}>
                                        {!chat.isGroupChat
                                            ? getSender(loggedUser, chat.users)
                                            : chat.chatName}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </Stack>
                ) : (
                    <LoadingButton loading variant="text" />
                )}
            </Box>
        </Box>
    );
};

export default MyChats;
