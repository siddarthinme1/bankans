import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../Firebase/Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Typography, Button, Container, Box, Avatar } from "@mui/material";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setPhotoURL(data.photoURL);
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserData();
  }, [user, loading]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          border: 1,
          borderRadius: 1,
          padding: 2,
          textAlign: "center",
        }}
      >
        {photoURL && (
          <Avatar
            alt={name}
            src={photoURL}
            sx={{ width: 80, height: 80, marginBottom: 2 }}
          />
        )}
        <Typography variant="h6" gutterBottom>
          Logged in as
        </Typography>
        <Typography variant="body1" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2">{user?.email}</Typography>
        <Button
          variant="contained"
          color="primary"
          className="dashboard__btn"
          onClick={logout}
          sx={{ marginTop: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default Dashboard;
