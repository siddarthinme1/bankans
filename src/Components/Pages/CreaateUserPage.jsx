import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const CreateUserPage = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user data to localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    // Reset the form after submission
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // This ensures the container takes the full height of the viewport
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Create a New Bank User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="Confirm Password"
          fullWidth
          margin="normal"
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Create User
        </Button>
      </form>
    </Container>
  );
};

export default CreateUserPage;
