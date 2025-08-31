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
  CardContent,
  Card
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


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
                />
                <TextField
                    label="Email"
                    value={user.email || ""}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <TextField
                    label="Education"
                    value={user.education || ""}
                    onChange={(e) => setUser({ ...user, education: e.target.value })}
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
                    <Card 
                        key={index} 
                        sx={{ borderRadius: 3, boxShadow: 3, mb: 3, p: 2 }}
                    >
                        <CardContent>
                        <Typography 
                            variant="h6" 
                            sx={{ fontWeight: 600, mb: 1, color: "primary.main" }}
                        >
                            {project.title}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ color: "text.secondary", mb: 2 }}
                        >
                            {project.description}
                        </Typography>
                        {project.links && (
                            <Button 
                            variant="outlined" 
                            color="primary" 
                            size="small" 
                            href={project.links} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            >
                            View Project
                            </Button>
                        )}
                        </CardContent>
                    </Card>
                    ))
                : user.projects && (
                    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3, p: 2 }}>
                        <CardContent>
                        <Typography 
                            variant="h6" 
                            sx={{ fontWeight: 600, mb: 1, color: "primary.main" }}
                        >
                            {user.projects.title}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ color: "text.secondary", mb: 2 }}
                        >
                            {user.projects.description}
                        </Typography>
                        {user.projects.links && (
                            <Button 
                            variant="outlined" 
                            color="primary" 
                            size="small" 
                            href={user.projects.links} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            >
                            View Project
                            </Button>
                        )}
                        </CardContent>
                    </Card>
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
