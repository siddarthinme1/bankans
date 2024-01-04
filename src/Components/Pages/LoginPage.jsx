import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import Context from "../Context/Context";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  }, [user, loading]);

  return (
    <Container
      maxWidth="auto"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 12,
        // minHeight: "100vh",
      }}
    >
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={7}>
          <Paper elevation={0} style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
              Welcome to ANS Bank
            </Typography>
            <Typography variant="body1">
              Experience seamless banking with ANS Bank. Login to your account
              to access various services.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Login
            </Typography>
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
            <Button
              onClick={() => logInWithEmailAndPassword(email, password)}
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "10px" }}
            >
              Login
            </Button>
            <Button
              onClick={signInWithGoogle}
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "10px" }}
            >
              Login with Google
            </Button>
            <Typography style={{ marginTop: "10px" }}>
              <Link to="/reset">Forgot Password</Link>
            </Typography>
            <Typography style={{ marginTop: "10px" }}>
              Don't have an account? <Link to="/register">Register</Link> now.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
