/*import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    dob: "1990-01-01",
    sex: "Male",
  });

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEditClick = (field) => {
    setEditField(field);
    setTempValue(user[field]);
  };

  const handleSaveClick = () => {
    setUser({ ...user, [editField]: tempValue });
    setEditField(null);
  };

  const handleCancelClick = () => {
    setEditField(null);
    setTempValue("");
  };

  const renderField = (field, label) => (
    <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={3}>
        <Typography variant="subtitle1">{label}:</Typography>
      </Grid>
      <Grid item xs={6}>
        {editField === field ? (
          <TextField
            fullWidth
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
        ) : (
          <Typography variant="body1">{user[field]}</Typography>
        )}
      </Grid>
      <Grid item xs={3}>
        {editField === field ? (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSaveClick}
              sx={{ mr: 1 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="text"
            size="small"
            onClick={() => handleEditClick(field)}
          >
            Edit
          </Button>
        )}
      </Grid>
    </Grid>
  );

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      {renderField("name", "Name")}
      {renderField("email", "Email")}
      {renderField("dob", "Date of Birth")}
      {renderField("sex", "Sex")}
    </Box>
  );
};

export default UserProfile;*/

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    dob: "1990-01-01",
    sex: "Male",
  });

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEditClick = (field) => {
    setEditField(field);
    setTempValue(user[field]);
  };

  const handleSaveClick = () => {
    setUser({ ...user, [editField]: tempValue });
    setEditField(null);
  };

  const handleCancelClick = () => {
    setEditField(null);
    setTempValue("");
  };

  const renderField = (field, label) => (
    <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={4}>
        <Typography variant="subtitle1" color="text.secondary">
          {label}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {editField === field ? (
          <TextField
            fullWidth
            variant="outlined"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
        ) : (
          <Typography variant="body1">{user[field]}</Typography>
        )}
      </Grid>
      <Grid item xs={2}>
        {editField === field ? (
          <Box>
            <IconButton color="primary" onClick={handleSaveClick}>
              <SaveIcon />
            </IconButton>
            <IconButton color="error" onClick={handleCancelClick}>
              <CancelIcon />
            </IconButton>
          </Box>
        ) : (
          <IconButton color="primary" onClick={() => handleEditClick(field)}>
            <EditIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "primary.main",
                fontSize: "2rem",
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Typography variant="h5" sx={{ mt: 2 }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User Profile
            </Typography>
          </Box>
          {renderField("name", "Name")}
          {renderField("email", "Email")}
          {renderField("dob", "Date of Birth")}
          {renderField("sex", "Sex")}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
