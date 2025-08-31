import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
        <Typography  variant="h3" gutterBottom>
            Predusk-Project
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/user")}
        >
          Go to User Form
        </Button>
    </Box>
  )
}
