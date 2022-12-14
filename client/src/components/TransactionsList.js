import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";

export default function TransactionsList({ transactions, fetchTransctions, setEditTransaction }) {
  async function remove(_id) {
    if (!window.confirm("Are You Really Sure ?? ")) {
      return;
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${_id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchTransctions();
      window.alert("Request Successful");
    }
  }

  function formatDate(date) {
    return dayjs(date).format("DD MMM YYYY");
  }

  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        Lists Of Transactions
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 7 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  {row.amount}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{formatDate(row.date)}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" component="label" onClick={() => setEditTransaction(row)}>
                    <EditTwoToneIcon />
                  </IconButton>

                  <IconButton color="warning" component="label" onClick={() => remove(row._id)}>
                    <DeleteForeverTwoToneIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
