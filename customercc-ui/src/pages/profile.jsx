import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../handlers/AuthContext';
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { ThemeProviderAuto } from '../handlers/Theme';

import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate()
  const { loggedInUser } = useAuth();

  function routetocards() {
    navigate('/cards')
  }

  // Initial User Data (can be fetched from API)
  const [userData, setUserData] = useState(loggedInUser);
  const [errors, setErrors] = useState({})
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  // Handler to toggle editing mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // Handler to update field values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const [, key] = name.split(".");
      var formattedvalue = value
      if (key == "pin") {
        formattedvalue = value
          .replace(/\D/g, "") // Remove Non-Digits
          .slice(0, 6);
        if (formattedvalue.length < 6) {
          errors[name] = 'Please enter min 6 digits'
        }
      }
      setIsEdited(true)
      setUserData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: formattedvalue },
      }));
    }
    else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors(errors)

  };

  // Handler to save changes
  const saveChanges = async () => {
    if (isEdited) {
      const newUserData = {
        newAddress: userData.address,
        newEmail: userData.email
      }
      console.log("Updated User Data:", newUserData, userData.username);

      // Send data to API
      try {
        const response = await axios.put(`http://51.8.188.255:9095/api/customer/${userData.username}/update-details`, newUserData);
        console.log("[API] Customer data updated successfully:", response.data);
      } catch (error) {
        console.error("[API] Error updating customer data:", error);
      }

    }

    setIsEditing(false);
  };

  return (
    <ThemeProviderAuto>
      <Box sx={{ maxWidth: 500, margin: "auto", padding: 3, border: "1px solid #ccc", borderRadius: 2, marginTop: 10 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={(typeof userData.name) == 'object' ? `${userData.name.first} ${userData.name.last}` : userData.name}
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
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              value={userData.username}
              fullWidth
              disabled
            />
          </Grid>
          {userData.address && (
            <>
              <Grid item xs={12} label="Address">
                <TextField
                  label="House No."
                  name="address.houseNo"
                  value={userData.address.houseNo}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} label="Address">
                <TextField
                  label="Street"
                  name="address.street"
                  value={userData.address.street}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} label="Address">
                <TextField
                  label="City"
                  name="address.city"
                  value={userData.address.city}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} label="Address">
                <TextField
                  label="PIN"
                  name="address.pin"
                  value={userData.address.pin}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} label="Address">
                <TextField
                  label="State"
                  name="address.state"
                  value={userData.address.state}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} label="Address">
                <TextField
                  label="Country"
                  name="address.country"
                  value={userData.address.country}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
            </>
          )}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
          {!isEditing ? (
            <Button variant="contained" color="primary" onClick={toggleEdit}>
              Edit
            </Button>
          ) : (
            <>
              <Button variant="outlined" color="error" onClick={toggleEdit}>
                Cancel
              </Button>
              <Button variant="contained" color="success" onClick={saveChanges}>
                Save
              </Button>
            </>
          )}
        </Box>
        <Button onClick={routetocards}>Credit Cards</Button>
      </Box>
    </ThemeProviderAuto>
  );
};

//modified code

export default UserProfile;