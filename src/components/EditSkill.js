import { useEffect, useState } from "react";
import { Box, Typography, Stack, TextField, Chip, IconButton, Button, CircularProgress, Tooltip,FormHelperText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import  axios  from "axios";



export default function EditSkill() {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [ loading , setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/users");
                const user = response.data.data[0];  
                setSkills(user.skills || []); 
                setLoading( false);
                
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);
    const handleAddSkill = () => {
        if (newSkill.trim() !== "") {
            console.log("newSkills object : ", newSkill )
            setSkills([...skills, newSkill.trim()]);
            console.log("Skills : ", skills)
            
        }
    };

    const handleDeleteSkill = async (skillToDelete) => {
        try {
        
            const updatedSkills = skills.filter((s)=> s !== skillToDelete)
            console.log("updatedSkills after filtering ", updatedSkills);
            const response = await axios.patch("http://localhost:4000/api/users/1",{
                skills: updatedSkills ,
                overwrite: ["skills"], 
            })
            const updateSkils = response.data.data.skills;
            console.log("Response from api ", updateSkils);
            setSkills(updateSkils);

        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };

 
    const handleSave = async () => {
        try {
             
            if (newSkill.trim() === "") {
                console.warn("No new skill to save");
                return; 
            }
            console.log("new skill , ", newSkill)
            const response = await axios.patch("http://localhost:4000/api/users/1", {
                skills: [newSkill.trim()],
            });
            console.log("Backend response", response)
            const updatedData = response.data.data;
            console.log('Updated Data', updatedData)
            setSkills(updatedData.skills);
            setNewSkill("");

            console.log("Updated skills:", updatedData.skills);
        } catch (error) {
            console.error("Error updating skills:", error);
        }
    };

    if (loading) return <CircularProgress/>

    return (
        <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Edit Skills
      </Typography>

      {/* Skills list */}
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {skills.map((skill, idx) =>
          (
            
            <Chip
              key={idx}
              label={skill}
              onDelete={() => handleDeleteSkill(skill)}
              color="primary"
              variant="outlined"
            />
          )
        )}
      </Stack>

      {/* Add new skill */}
      <Stack direction="row" spacing={1} mt={2}>
        <TextField
          label="Add skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
          size="small"
        />
        <Tooltip title="Click to Add new Skill">
            <IconButton onClick={handleAddSkill} color="primary">
                <AddIcon />
            </IconButton>
        </Tooltip>
        
      </Stack>

      {/* Save button */}
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
        Save
      </Button>
        < FormHelperText sx={{ mt: 1, color: "text.secondary" }}>
            Press "Save" to apply your final changes.
        </FormHelperText>
    </Box>
    )
}
