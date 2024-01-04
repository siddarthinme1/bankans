import { InfoOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 0.5,
        m: 0.5,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        width: { xs: "auto", md: "450px" },
        ...sx,
      }}
      {...other}
    />
  );
}

export default function LicDetailsDisplay(selectedRow) {
  return (
    <>
      <Box sx={{ display: "grid", width: "100%" }}>
        <Item>
          Commencement Date: {selectedRow.selectedRow.CommencementDate}
        </Item>
        <Item>Name: {selectedRow.selectedRow.Name}</Item>
        <Item>Date of Birth: {selectedRow.selectedRow.DOB}</Item>
        <Item>Policy No.: {selectedRow.selectedRow.PolicyNo}</Item>
        <Item>Premium: {selectedRow.selectedRow.Premium}</Item>
        <Item>Username: {selectedRow.selectedRow.Username}</Item>

        <Item>Plan: {selectedRow.selectedRow.Plan}</Item>
        <Item>Policy Term: {selectedRow.selectedRow.PolicyTerm}</Item>
        <Item>
          Premium Paying Term: {selectedRow.selectedRow.PremiumPayingTerm}
        </Item>
        <Item>Sum Assured: {selectedRow.selectedRow.SumAssured}</Item>
        <Item>
          Date Of Last Payment: {selectedRow.selectedRow.DateOfLastPayment}
        </Item>
        <Item> Nomination: {selectedRow.selectedRow.Nomination}</Item>
        <Item>Maturity Date: {selectedRow.selectedRow.MaturityDate}</Item>
        <Item>Comments: {selectedRow.selectedRow.Comments}</Item>
      </Box>
    </>
  );
}
