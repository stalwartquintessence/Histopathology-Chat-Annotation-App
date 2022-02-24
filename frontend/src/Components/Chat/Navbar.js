import { Box, IconButton } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { ChatState } from "../../Context/ChatProvider";
import { useHistory } from "react-router-dom";

function Navbar() {
    const { user } = ChatState();

    const history = useHistory();

    const handleLogout = () => {
        const answer = window.confirm("Proceed to Logout?");
        if (answer) {
            localStorage.removeItem("userInfo");
            history.push("/");
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#161b22",
                    width: "100%",
                    marginBottom: 0.2,
                    color: "white",
                    paddingY: 1,
                }}>
                <img
                    src="/images/hisca-logo-white.png"
                    alt="logo"
                    width="150"
                    height="40"
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "white",
                        fontSize: "large",
                        fontWeight: "600",
                    }}>
                    {user.name.toString().toUpperCase()}
                    <IconButton id="logout-btn" onClick={handleLogout}>
                        <Logout fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
}

export default Navbar;
