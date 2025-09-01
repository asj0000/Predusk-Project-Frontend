import  { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import api from '../api'

const SearchSkill = ({ userId }) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

      try {
        const res = await api.get(
            `/api/users/${userId}/skills?name=${query}`
        );

        console.log("Res->", res);

        if (res.data.success && res.data.data) {
            setResult(res.data.data);
            setError("");
        } else if (res.data.success && !res.data.data) {
            setResult(null);
            setError( "Skill does not exist ❌");
        } else {
            setResult(null);
            setError("Unexpected response");
        }
    } catch (err) {
        setResult(null);
        setError("Not Found ❌");
    }
  };

  return (
    <Box sx={{ mb: 3 }}> 
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        🔍 Search Skill
      </Typography>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          label="Enter skill"
          variant="outlined"
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Display result */}
      {result && (
        <Typography sx={{ mt: 2, color: "green", fontWeight: 500 }}>
          ✅ Skill Found: {result}
        </Typography>
      )}
      {error && (
        <Typography sx={{ mt: 2, color: "red", fontWeight: 500 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default SearchSkill;
