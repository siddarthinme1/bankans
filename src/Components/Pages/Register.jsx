import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
} from "@mui/material";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../Firebase/Firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const register = () => {
    if (!name) {
      alert("Please enter name");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 12,
        // minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: "20px", textAlign: "center", width: "100%" }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <TextField
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Full Name"
        />
        <TextField
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="E-mail Address"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="E-mail Address"
        />
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Password"
        />
        <TextField
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Confirm Password"
        />
        {passwordMismatch && (
          <Alert severity="error" style={{ marginTop: "10px" }}>
            Passwords do not match.
          </Alert>
        )}
        <Button
          onClick={register}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Register
        </Button>
        <Button
          onClick={signInWithGoogle}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
        >
          Register with Google
        </Button>
        <Typography style={{ marginTop: "10px" }}>
          Already have an account? <Link to="/">Login</Link> now.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;
