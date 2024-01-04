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
  AppBar,
  Tooltip,
} from "@mui/material";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";
import LicDataPage from "./AddLicData";
import CreditCardForm from "./LicDetailsDisplay";
import DeleteIcon from "@mui/icons-material/Delete";
import LicDetailsDisplay from "./LicDetailsDisplay";
import CloseIcon from "@mui/icons-material/Close";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import RestoreIcon from "@mui/icons-material/Restore";

const DisplayLicData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bin, setBin] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

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
  }, [data, filteredData]);

  useEffect(() => {
    const filteredResults = data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [searchTerm, data]);

  const handleRowClick = (rowData) => {
    setDeleteStatus(rowData.Status);
    setSelectedRow(rowData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteEntry = async () => {
    try {
      await updateDoc(doc(db, "licdetails", selectedRow.id), {
        Status: !deleteStatus,
      });
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
            {bin ? "Deleted Data" : "LIC Data"}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={8} md={8}>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={1} md={1}>
              <Tooltip title="Recycle Bin">
                <IconButton onClick={() => setBin(!bin)}>
                  <AutoDeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={1} md={1}>
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
            {filteredData.map((item) => {
              if (item.Status && bin == false) {
                return (
                  <TableRow
                    key={item.id}
                    sx={{ height: 40, cursor: "pointer" }}
                    onClick={() => handleRowClick(item)}
                  >
                    <TableCell>{item.CommencementDate}</TableCell>
                    <TableCell>{item.Name}</TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {item.DOB}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {item.PolicyNo}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {item.Premium}
                    </TableCell>
                  </TableRow>
                );
              } else if (item.Status == false && bin) {
                return (
                  <TableRow
                    key={item.id}
                    sx={{ height: 40, cursor: "pointer" }}
                    onClick={() => handleRowClick(item)}
                  >
                    <TableCell>{item.CommencementDate}</TableCell>
                    <TableCell>{item.Name}</TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {item.DOB}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {item.PolicyNo}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {item.Premium}
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            {bin ? (
              <Tooltip title="Double click to Restore">
                <IconButton color="warning" onDoubleClick={handleDeleteEntry}>
                  <RestoreIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Double click to Delete">
                <IconButton color="warning" onDoubleClick={handleDeleteEntry}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              LIC Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseDialog}>
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          {selectedRow && (
            <>
              <LicDetailsDisplay selectedRow={selectedRow} />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ gridColumn: "1/-1" }}></DialogActions>
      </Dialog>
    </Container>
  );
};
export default DisplayLicData;
