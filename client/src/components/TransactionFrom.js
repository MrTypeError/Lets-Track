import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { create } from "@mui/material/styles/createTransitions";

const initialForm = {
  amount: "",
  description: "",
  date: new Date(),
};

export default function TransactionForm({ fetchTransctions, editTransaction }) {
  const [form, setform] = useState(initialForm);

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setform(editTransaction);
    }
  }, [editTransaction]);

  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  function handleDate(newValue) {
    setform({ ...form, date: newValue });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = editTransaction === undefined ? create() : update();
  }

  function reload(res) {
    if (res.ok) {
      setform(initialForm);
      fetchTransctions();
    }
  }

  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    reload(res);
  }
  async function update() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`, {
      method: "PATCH",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    reload(res);
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Add New Transaction</Typography>
          <TextField
            sx={{ marginRight: 5 }}
            id="filled-basic"
            label="Amount"
            size="small"
            name="amount"
            variant="filled"
            value={form.amount}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="filled-basic"
            label="Description"
            name="description"
            size="small"
            variant="filled"
            value={form.description}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="MM/DD/YYYY"
              value={form.date}
              name="date"
              onChange={handleDate}
              renderInput={(params) => <TextField sx={{ marginRight: 3 }} size="small" {...params} />}
            />
          </LocalizationProvider>
          {editTransaction.amount !== undefined && (
            <Button type="submit" variant="secondary">
              UPDATE
            </Button>
          )}
          {editTransaction.amount === undefined && (
            <Button type="submit" variant="contained">
              SUBMIT
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
