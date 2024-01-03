import { Container } from "@mui/material";
import React from "react";

function LicDataPage() {
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
      Lic Data page
    </Container>
  );
}

export default LicDataPage;
