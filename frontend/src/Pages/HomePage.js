import { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material/";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Login from "../Components/Authentication/Login";
import SignUp from "../Components/Authentication/SignUp";
import { useHistory } from "react-router";

export default function HomePage() {
    const history = useHistory();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) history.push("/chats");
    }, [history]);

    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                width: "100%",
                typography: "body1",
            }}>
            <div>
                <TabContext value={value}>
                    <Box>
                        <TabList onChange={handleChange} centered>
                            <Tab label="Login" value="1" />
                            <Tab label="Sign Up" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Login />
                    </TabPanel>
                    <TabPanel value="2">
                        <SignUp />
                    </TabPanel>
                </TabContext>
            </div>
        </Box>
    );
}
