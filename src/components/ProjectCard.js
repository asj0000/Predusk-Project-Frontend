import { Card, CardContent, Typography, Button } from "@mui/material";

const ProjectCard = ({ title, description, links }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3, p: 2 }}>
      <CardContent>
        <Typography 
          variant="h6" 
          sx={{ fontWeight: 600, mb: 1, color: "primary.main" }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ color: "text.secondary", mb: 2 }}
        >
          {description}
        </Typography>
        {links && (
          <Button 
            variant="outlined" 
            color="primary" 
            size="small" 
            href={links} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View Project
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
