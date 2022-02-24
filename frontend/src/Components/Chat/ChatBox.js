import { Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();

    const history = useHistory();
    const handleAnnotationClick = () => {
        history.push("/chats/annotate");
    };

    return (
        <Box
            sx={{
                color: "white",
                display: { xs: selectedChat ? "flex" : "none", md: "flex" },
                flexDirection: "column",
                bgcolor: "#161b22",
                width: { xs: "100%", md: "60%", lg: "70%" },
                padding: 2,
                height: "100%",
            }}>
            <button
                className="annotation-btn room"
                variant="contained"
                onClick={handleAnnotationClick}>
                Annotation Room
            </button>
            <SingleChat />
        </Box>
    );
};

export default ChatBox;
