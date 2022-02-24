import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@mui/material";
import Navbar from "../Components/Chat/Navbar";
import MyChats from "../Components/Chat/MyChats";
import ChatBox from "../Components/Chat/ChatBox";

const ChatPage = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);
    return (
        <div style={{ width: "100%" }}>
            {user && <Navbar />}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "91.7vh",
                }}>
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && (
                    <ChatBox
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                    />
                )}
            </Box>
        </div>
    );
};

export default ChatPage;
