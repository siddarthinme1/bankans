import { Container } from "@mui/material";
import React from "react";

function VehicleInsurancePage() {
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
      Insurance page
    </Container>
  );
}

export default VehicleInsurancePage;
