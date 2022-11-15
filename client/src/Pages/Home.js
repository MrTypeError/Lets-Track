import React from "react";
import TransactionForm from "../components/TransactionFrom";
import TransactionsList from "../components/TransactionsList";
import { Container } from "@mui/material";
import { useState, useEffect } from "react";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransctions();
  }, []);

  async function fetchTransctions() {
    const res = await fetch("http://localhost:4000/transaction");
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
