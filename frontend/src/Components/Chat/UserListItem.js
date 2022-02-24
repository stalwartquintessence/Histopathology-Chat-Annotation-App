import { Avatar, Box, Typography } from "@mui/material";

const UserListItem = ({ user, handleFunction }) => {
    return (
        <div onClick={handleFunction}>
            <Box
                sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    padding: 1,
                    margin: 1,
                    borderRadius: "5px",
                    backgroundColor: "whitesmoke",
                }}>
                <Avatar sx={{ bgcolor: "161b22", marginRight: "1em" }}>
                    {user.name.toString()[0].toUpperCase()}
                </Avatar>
                <Box>
                    <Typography>{user.name}</Typography>
                    <Typography variant="b2">{user.email}</Typography>
                </Box>
            </Box>
        </div>
    );
};

export default UserListItem;
