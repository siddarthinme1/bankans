import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Stack,
  Grid,
  Box,
  Toolbar,
  TextField,
} from "@mui/material";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";
import LicDataPage from "./AddLicData";
import CreditCardForm from "./LicDetailsDisplay";
import DeleteIcon from "@mui/icons-material/Delete";
import LicDetailsDisplay from "./LicDetailsDisplay";

const DisplayLicData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "licdetails"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update filteredData whenever the search term changes
    const filteredResults = data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [searchTerm, data]);

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteEntry = async () => {
    try {
      await deleteDoc(doc(db, "licdetails", selectedRow.id));
      const updatedData = data.filter((item) => item.id !== selectedRow.id);
      setData(updatedData);
      setFilteredData(updatedData);
      handleCloseDialog();
    } catch (error) {
      console.error("Error deleting entry: ", error);
    }
  };

  return (
    <Container maxWidth="auto" sx={{ mt: 12 }}>
      <Toolbar>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Typography variant="h4" align="center" gutterBottom>
            LIC Data
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <LicDataPage />
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ minHeight: 50 }}>
              <TableCell sx={{ minWidth: 100 }}>Commencement Date</TableCell>
              <TableCell sx={{ minWidth: 150 }}>Name</TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                Date of Birth
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                Policy No.
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                Premium
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow
                key={item.id}
                sx={{ height: 40, cursor: "pointer" }}
                onClick={() => handleRowClick(item)}
              >
                <TableCell>{item.CommencementDate}</TableCell>
                <TableCell>{item.Name}</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  {item.DOB}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  {item.PolicyNo}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  {item.Premium}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Lic Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
              <LicDetailsDisplay selectedRow={selectedRow} />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ gridColumn: "1/-1" }}>
          <IconButton color="error" onClick={handleDeleteEntry}>
            <DeleteIcon />
          </IconButton>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default DisplayLicData;
