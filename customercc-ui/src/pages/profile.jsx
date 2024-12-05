import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../handlers/AuthContext';
import { Box, TextField, Button, Typography, Grid } from "@mui/material";

const UserProfile = () => {
 
  const navigate = useNavigate()
  const { loggedInUser } = useAuth();
 
  function routetocards() {
    navigate('/cards')
  }
 
  // Initial User Data (can be fetched from API)
  const [userData, setUserData] = useState(loggedInUser);

  const [isEditing, setIsEditing] = useState(false);

  // Handler to toggle editing mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // Handler to update field values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler to save changes
  const saveChanges = () => {
    console.log("Updated User Data:", userData);

    // Send data to API
    // fetch("https://api.example.com/updateUser", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(userData),
    // })
    //     .then((response) => response.json())
    //     .then((data) => console.log("Update successful:", data))
    //     .catch((error) => console.error("Error updating user:", error));

    setIsEditing(false);
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 3, border: "1px solid #ccc", borderRadius: 2, marginTop: 10 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            fullWidth
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={userData.dob}
            onChange={handleInputChange}
            fullWidth
            disabled
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Sex"
            name="sex"
            value={userData.sex}
            onChange={handleInputChange}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            fullWidth
            disabled
            helperText="Username cannot be changed"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            fullWidth
            disabled={!isEditing}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
        {!isEditing ? (
          <Button variant="contained" color="primary" onClick={toggleEdit}>
            Edit
          </Button>
        ) : (
          <>
            <Button variant="contained" color="success" onClick={saveChanges}>
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={toggleEdit}>
              Cancel
            </Button>
          </>
        )}
      </Box>
      <Button onClick={routetocards}>Credit Cards</Button>
    </Box>
  );
};
 
//modified code

export default UserProfile;