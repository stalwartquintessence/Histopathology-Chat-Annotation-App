import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import axios from "axios";
import { useHistory } from "react-router-dom";

const theme = createTheme();

export default function Login() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    const handleClickShowPassword = () => setShow(!show);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            alert("All fields are mandatory");
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
            history.push("/chats");
            window.location.reload(true);
        } catch (error) {
            console.log(error.response.data.message);
            alert("Incorrect Details. Try Again.");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    label="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel htmlFor="password">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        label="Password"
                                        type={show ? "text" : "password"}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        autoComplete="current-password"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    edge="end">
                                                    {show ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <Link
                                    sx={{
                                        marginTop: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                    }}
                                    href="#"
                                    variant="body1">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item xs></Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}>
                            Login
                        </Button>
                    </Box>
                    <Grid
                        sx={{ mt: 5 }}
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        fontSize={15}>
                        {"Copyright © Hisca "}
                        {new Date().getFullYear()}
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
