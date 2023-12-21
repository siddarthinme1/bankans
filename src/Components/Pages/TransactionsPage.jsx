import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Popover,
  IconButton,
  Hidden,
  Toolbar,
  Divider,
} from "@mui/material";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { auth } from "../../Firebase/Firebase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TransactionsPage = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [userName, setUserName] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editTransactionId, setEditTransactionId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName || "User");
    }
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "transactions"), {
          orderBy: "dateTime",
          descending: true,
        });
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions: ", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleTransaction = async () => {
    const transactionAmount = parseFloat(amount);

    if (!isNaN(transactionAmount) && transactionAmount !== 0) {
      try {
        const type = transactionType === "deposit" ? "Deposit" : "Withdraw";
        const transactionTime = new Date();

        if (editTransactionId) {
          await updateDoc(doc(db, "transactions", editTransactionId), {
            type,
            amount:
              transactionType === "withdraw"
                ? -transactionAmount
                : transactionAmount,
            description,
            addedBy: userName,
            dateTime: transactionTime.toISOString(),
          });

          const updatedTransactions = transactions.map((transaction) =>
            transaction.id === editTransactionId
              ? {
                  id: transaction.id,
                  type,
                  amount:
                    transactionType === "withdraw"
                      ? -transactionAmount
                      : transactionAmount,
                  description,
                  addedBy: userName,
                  dateTime: transactionTime.toISOString(),
                }
              : transaction
          );

          setTransactions(updatedTransactions);
          setEditTransactionId(null);
        } else {
          const newTransactionRef = await addDoc(
            collection(db, "transactions"),
            {
              type,
              amount:
                transactionType === "withdraw"
                  ? -transactionAmount
                  : transactionAmount,
              description,
              addedBy: userName,
              dateTime: transactionTime.toISOString(),
            }
          );

          setTransactions([
            {
              id: newTransactionRef.id,
              type,
              amount:
                transactionType === "withdraw"
                  ? -transactionAmount
                  : transactionAmount,
              description,
              addedBy: userName,
              dateTime: transactionTime.toISOString(),
            },
            ...transactions,
          ]);
        }

        setAmount("");
        setDescription("");
        setTransactionType("deposit");
      } catch (error) {
        console.error("Error adding/updating transaction: ", error);
      }
    }
  };

  const handleEdit = (id) => {
    const transactionToEdit = transactions.find(
      (transaction) => transaction.id === id
    );

    if (transactionToEdit) {
      setAmount(transactionToEdit.amount.toString());
      setDescription(transactionToEdit.description);
      setTransactionType(transactionToEdit.type.toLowerCase());
      setEditTransactionId(id);
    }
  };

  const handleCancelEdit = () => {
    setAmount("");
    setDescription("");
    setTransactionType("deposit");
    setEditTransactionId(null);
  };

  const handleRowClick = (id, event) => {
    setSelectedTransaction(id === selectedTransaction ? null : id);
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteSelected = async () => {
    try {
      await deleteDoc(doc(db, "transactions", selectedTransaction));

      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== selectedTransaction
      );

      setTransactions(updatedTransactions);
      setSelectedTransaction(null);
      setAnchorEl(null);
    } catch (error) {
      console.error("Error deleting selected transaction: ", error);
    }
  };

  const totalBalance = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Container maxWidth="auto" sx={{ marginTop: { md: "100px", xs: "60px" } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Transaction</Typography>
            <Grid container spacing={2}>
              <Grid item xs={5} sm={12}>
                <TextField
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>

              <Grid item xs={5} sm={12}>
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={2} sm={12}>
                <RadioGroup
                  row
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  <Hidden smDown>
                    <FormControlLabel
                      value="deposit"
                      control={<Radio color="success" />}
                      label="Deposit"
                    />
                    <FormControlLabel
                      value="withdraw"
                      control={<Radio color="error" />}
                      label="Withdraw"
                    />
                  </Hidden>
                  <Hidden mdUp>
                    <FormControlLabel
                      value="deposit"
                      control={<Radio color="success" />}
                      label="D"
                    />
                    <FormControlLabel
                      value="withdraw"
                      control={<Radio color="error" />}
                      label="W"
                    />
                  </Hidden>
                </RadioGroup>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              onClick={handleTransaction}
            >
              {editTransactionId ? "Update" : "Submit"}
            </Button>
            {editTransactionId && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancelEdit}
                style={{ marginLeft: "8px" }}
              >
                Cancel
              </Button>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} style={{ padding: "20px", overflowY: "auto" }}>
            <Toolbar>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">All Transactions</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">
                    Balance: ₹{totalBalance.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
            </Toolbar>
            <TableContainer style={{ maxHeight: "243px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Added By</TableCell>
                    <TableCell>Date and Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow
                      key={index}
                      onClick={(e) => handleRowClick(transaction.id, e)}
                      selected={selectedTransaction === transaction.id}
                      hover
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>₹{transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.addedBy}</TableCell>
                      <TableCell>
                        {new Date(transaction.dateTime).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 1 }}>
                <IconButton
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(selectedTransaction)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  variant="contained"
                  color="secondary"
                  onClick={handleDeleteSelected}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Popover>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TransactionsPage;
