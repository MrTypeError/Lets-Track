import React from "react";
import TransactionForm from "../components/TransactionFrom";
import TransactionsList from "../components/TransactionsList";
import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransctions();
  }, []);

  async function fetchTransctions() {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setTransactions(data);
    console.log(data);
  }

  return (
    <Container>
      <TransactionForm fetchTransctions={fetchTransctions} editTransaction={editTransaction} />
      <TransactionsList
        transactions={transactions}
        fetchTransctions={fetchTransctions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}
