import { useEffect , useState } from 'react';
import {
  TextField,
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
  IconButton,
  Chip,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ProjectCard from "../components/ProjectCard";


export default function User() {
    const [ user , setUser ] = useState(  null );
    const [ loading , setLoading ] = useState( true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/api/users")
        .then(res => {
            console.log("Response ", res)
            setUser(res.data.data[0]);
            setLoading( false );
        })
        .catch(err => console.error(err));
    }, []);

    const updateUserField = async( field , value )=>{
        try {
            
            const response = await axios.patch('http://localhost:4000/api/users/1', {
                [field]: value,
            })
            const updatedUser = response.data.data;
              setUser((prev) => ({
                ...prev,
                [field]: updatedUser[field],
            }));
            console.log( "Updated User ", updatedUser);
            
        } catch (error) {
            console.error("Error updating user:", error);
            
        }
    }

    const handleKeyPress = (e , field)=>{
        if (e.key === "Enter") {
            updateUserField(field, user[field]);
        }
    }

    if (loading) return <CircularProgress/>
    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                My Information
            </Typography>
            <Stack spacing={2}>
                <TextField
                    label="Name"
                    value={user.name || ""}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    onKeyDown={(e) => handleKeyPress(e, "name")}
                />
                <TextField
                    label="Email"
                    value={user.email || ""}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    onKeyDown={(e) => handleKeyPress(e, "email")}
                />
                <TextField
                    label="Education"
                    value={user.education || ""}
                    onChange={(e) => setUser({ ...user, education: e.target.value })}
                    onKeyDown={(e) => handleKeyPress(e, "education")}
                />
                <Typography 
                variant="h6" 
                sx={{ 
                        fontWeight: 600, 
                        color: "text.primary", 
                        mb: 4 
                    }}
                >
                    Skills
                </Typography>

                {/* 🔹 Skills Section */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2, mb: 2 }}>
                {user.skills?.map((skill, index) => (
                    <Chip
                        key={index}
                        label={skill}
                        color="primary"
                        variant="outlined"
                        sx={{
                            fontWeight: 500,
                            fontSize: "0.85rem",
                            borderRadius: "8px",
                            px: 1,
                            "&:hover": { backgroundColor: "primary.light", color: "white" },
                        }}
                    />
                ))}
                </Box>

                <Button
                    variant="outlined"
                    onClick={() => navigate(`/edit-skill/${user.id}`)}
                >
                    Edit Skills
                </Button>

                <Typography 
                variant="h6" 
                sx={{ 
                    fontWeight: 600, 
                    color: "text.primary", 
                    mt: 6,   // space above section
                    mb: 3 
                }}
                >
                    Projects
                </Typography>
                {Array.isArray(user.projects) 
                ? user.projects.map((project, index) => (
                        <ProjectCard 
                            key={index} 
                            title={project.title} 
                            description={project.description} 
                            links={project.links} 
                        />
                    ))
                : user.projects && (
                        <ProjectCard 
                            title={user.projects.title} 
                            description={user.projects.description} 
                            links={user.projects.links} 
                        />
                    )
                }
                <Button
                    variant="outlined"
                    onClick={() => navigate(`/edit-project/${user.id}`)}
                >
                    Edit Projects
                </Button>

                <TextField
                    label="Work"
                    value={user.work || ""}
                    onChange={(e) => setUser({ ...user, work: e.target.value })}
                />
                {Object.entries(user.links || {}).map(([key, value]) => (
                    <div key={key} style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                        <TextField
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={value}
                            onChange={(e) =>
                                setUser({
                                ...user,
                                links: { ...user.links, [key]: e.target.value },
                                })
                            }
                            fullWidth
                            slotProps={{
                                input: {
                                readOnly: true, // replaces InputProps
                                },
                                formHelperText: {
                                sx: { color: "primary.main", fontWeight: 500 },
                                },
                            }}
                            helperText="🔒 Links are read-only and cannot be modified"
                        />
                        <IconButton
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            disabled={!value} // disable if empty
                        >
                        <OpenInNewIcon />
                        </IconButton>
                    </div>
                ))}
            </Stack>

        </Box>
    )
}
