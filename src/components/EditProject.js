import axios from "axios";
import { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Stack, FormHelperText, Link } from "@mui/material";



export default function EditProject() {

    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        links: "",
    });
    useEffect(()=>{
        const fetchProjects = async ()=>{
            try {
                const response = await axios.get('http://localhost:4000/api/users');
                const data = response.data.data[0];
                setProjectData(data.projects || {});

            } catch (error) {
                console.log( "Error in fetching projects ",error);
            }
        }

        fetchProjects();
    } , [])

    const handleSaveProject = async () => {
        try {
            const response = await axios.patch(
                "http://localhost:4000/api/users/1",
                 {projects: projectData}  // send updated project object
            );
            console.log("Response ", response.data.data);
            const data = response.data.data;
            console.log("Updated Project:", data.projects);
            alert("Project updated successfully ✅");
        } catch (error) {
            console.error("Error updating project:", error);
            alert("Something went wrong ❌");
        }
    };

    return (
        <Box p={4} maxWidth={600} mx="auto">
        <Typography variant="h5" gutterBottom>
            Edit Project
        </Typography>

        <Stack spacing={3}>
            <TextField
                label="Project Title"
                value={projectData.title || ""}
                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                fullWidth
            />

            <TextField
                label="Project Description"
                value={projectData.description || ""}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                multiline
                rows={4}
                fullWidth
            />

            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                Project Link
            </Typography>
            <Link
                href={projectData.links || "#"}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                    display: "block",
                    py: 1,
                    px: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    color: "primary.main",
                    fontWeight: 500,
                    overflowWrap: "break-word",
                }}
            >
                {projectData.links || "No link provided"}
            </Link>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                🔒 Links are read-only and cannot be modified
            </Typography>
        </Stack>

        <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSaveProject}
        >
            Save
        </Button>

        <FormHelperText sx={{ mt: 1, color: "text.secondary" }}>
            Press "Save" to apply your changes to this project.
        </FormHelperText>
        </Box>
    )
}
