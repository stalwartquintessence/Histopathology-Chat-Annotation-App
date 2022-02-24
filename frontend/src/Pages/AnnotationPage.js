import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./AnnotationPage.css";
import { useState } from "react";
import Board from "../Components/Annotation/Board";
import { useHistory } from "react-router-dom";

const AnnotationPage = () => {
    const [previewImage, setPreviewImage] = useState("");
    const handleImageChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            setPreviewImage(URL.createObjectURL(selectedFile));
        } else {
            alert("Provide correct image and format");
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const history = useHistory();
    const handleClick = () => {
        const answer = window.confirm(
            "All the annotation will be deleted.\nAre you sure?"
        );
        if (answer) {
            history.push("/chats");
            window.location.reload(true);
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
            <img id="tissue" src={previewImage} alt="Tissue" />
            <Board />
            <Box className="annotations-sidebar">
                <h2>Annotation Room</h2>
                <hr />
                <p>Upload the tissue file here and start annotating.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </form>
            </Box>
            <div className="chats">
                <IconButton onClick={handleClick}>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </div>
        </Box>
    );
};
export default AnnotationPage;
