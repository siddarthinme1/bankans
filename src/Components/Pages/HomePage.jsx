import { Container } from "@mui/material";
import React from "react";
import CreditCardForm from "./LicPages/LicDetailsDisplay";

function HomePage() {
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
      Welcome to ANS Bank
    </Container>
  );
}

export default HomePage;
