// /*import React, { useState } from "react";
// import { TextField, Button, Box, Typography, Grid } from "@mui/material";

// const UserProfile = () => {
//   const [user, setUser] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     dob: "1990-01-01",
//     sex: "Male",
//   });

//   const [editField, setEditField] = useState(null);
//   const [tempValue, setTempValue] = useState("");

//   const handleEditClick = (field) => {
//     setEditField(field);
//     setTempValue(user[field]);
//   };

//   const handleSaveClick = () => {
//     setUser({ ...user, [editField]: tempValue });
//     setEditField(null);
//   };

//   const handleCancelClick = () => {
//     setEditField(null);
//     setTempValue("");
//   };

//   const renderField = (field, label) => (
//     <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
//       <Grid item xs={3}>
//         <Typography variant="subtitle1">{label}:</Typography>
//       </Grid>
//       <Grid item xs={6}>
//         {editField === field ? (
//           <TextField
//             fullWidth
//             value={tempValue}
//             onChange={(e) => setTempValue(e.target.value)}
//           />
//         ) : (
//           <Typography variant="body1">{user[field]}</Typography>
//         )}
//       </Grid>
//       <Grid item xs={3}>
//         {editField === field ? (
//           <>
//             <Button
//               variant="contained"
//               color="primary"
//               size="small"
//               onClick={handleSaveClick}
//               sx={{ mr: 1 }}
//             >
//               Save
//             </Button>
//             <Button
//               variant="outlined"
//               color="secondary"
//               size="small"
//               onClick={handleCancelClick}
//             >
//               Cancel
//             </Button>
//           </>
//         ) : (
//           <Button
//             variant="text"
//             size="small"
//             onClick={() => handleEditClick(field)}
//           >
//             Edit
//           </Button>
//         )}
//       </Grid>
//     </Grid>
//   );

//   return (
//     <Box
//       sx={{
//         maxWidth: "600px",
//         margin: "auto",
//         mt: 5,
//         p: 3,
//         boxShadow: 3,
//         borderRadius: 2,
//         bgcolor: "background.paper",
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         User Profile
//       </Typography>
//       {renderField("name", "Name")}
//       {renderField("email", "Email")}
//       {renderField("dob", "Date of Birth")}
//       {renderField("sex", "Sex")}
//     </Box>
//   );
// };

// export default UserProfile;*/

// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Grid,
//   Avatar,
//   Card,
//   CardContent,
//   IconButton,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Cancel";

// const UserProfile = () => {
//   const [user, setUser] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     dob: "1990-01-01",
//     sex: "Male",
//   });

//   const [editField, setEditField] = useState(null);
//   const [tempValue, setTempValue] = useState("");

//   const handleEditClick = (field) => {
//     setEditField(field);
//     setTempValue(user[field]);
//   };

//   const handleSaveClick = () => {
//     setUser({ ...user, [editField]: tempValue });
//     setEditField(null);
//   };

//   const handleCancelClick = () => {
//     setEditField(null);
//     setTempValue("");
//   };

//   const renderField = (field, label) => (
//     <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
//       <Grid item xs={4}>
//         <Typography variant="subtitle1" color="text.secondary">
//           {label}:
//         </Typography>
//       </Grid>
//       <Grid item xs={6}>
//         {editField === field ? (
//           <TextField
//             fullWidth
//             variant="outlined"
//             value={tempValue}
//             onChange={(e) => setTempValue(e.target.value)}
//           />
//         ) : (
//           <Typography variant="body1">{user[field]}</Typography>
//         )}
//       </Grid>
//       <Grid item xs={2}>
//         {editField === field ? (
//           <Box>
//             <IconButton color="primary" onClick={handleSaveClick}>
//               <SaveIcon />
//             </IconButton>
//             <IconButton color="error" onClick={handleCancelClick}>
//               <CancelIcon />
//             </IconButton>
//           </Box>
//         ) : (
//           <IconButton color="primary" onClick={() => handleEditClick(field)}>
//             <EditIcon />
//           </IconButton>
//         )}
//       </Grid>
//     </Grid>
//   );

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         bgcolor: "background.default",
//         px: 2,
//       }}
//     >
//       <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 4, borderRadius: 3 }}>
//         <CardContent>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               mb: 4,
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 80,
//                 height: 80,
//                 bgcolor: "primary.main",
//                 fontSize: "2rem",
//               }}
//             >
//               {user.name.charAt(0)}
//             </Avatar>
//             <Typography variant="h5" sx={{ mt: 2 }}>
//               {user.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               User Profile
//             </Typography>
//           </Box>
//           {renderField("name", "Name")}
//           {renderField("email", "Email")}
//           {renderField("dob", "Date of Birth")}
//           {renderField("sex", "Sex")}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default UserProfile;



import { useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
 
const UserProfile = () => {
  // Initial User Data (can be fetched from API)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    dob: "1985-12-15",
    sex: "Male",
    username: "johndoe",
    address: "123, Elm Street, Springfield",
  });
 
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
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 3, border: "1px solid #ccc", borderRadius: 2 }}>
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
    </Box>
  );
};

//modified code
 
export default UserProfile;