const express = require("express");
const database = require("../DataBase/Connection");

const getAmountData = async (req, res) => {
  const sql = "SELECT * FROM amount";
  database.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
};

const addAmount = async (req, res) => {
  const {
    member_id,
    amount,
    voucher_no,
    book_no,
    payment_date,
    payment_receiver,
    update_date,
  } = req.body;

  const q =
    "INSERT INTO amount ( member_id, amount, voucher_no, book_no, payment_date, payment_receiver, update_date) VALUES ( ?, ?, ?, ?, ?, ?, ?)";
  const data = [
   
    member_id,
    amount,
    voucher_no,
    book_no,
    payment_date,
    payment_receiver,
    update_date,
  ];

  database.query(q, data, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error adding amount" });
    }
    return res.json({ success: "Amount added successfully" });
  });
};

const editAmount = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * from amount where id=?";
  const data = [id];

  database.query(q, data, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

// save edit abount
const saveAmount = (req, res) => {
  const id = req.params.id;
  const {
    member_id,
    amount,
    voucher_no,
    book_no,
    payment_date,
    payment_receiver,
    update_date,
  } = req.body;

  const sql = `
    UPDATE amount 
    SET member_id=?, amount=?, voucher_no=?, book_no=?, payment_date=?, payment_receiver=?, update_date=?
    WHERE id = ?`;

  const data = [
    member_id,
    amount,
    voucher_no,
    book_no,
    payment_date,
    payment_receiver,
    update_date,
    id,
  ];
  database.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

// dalet amount
const deleteAmount = async (req, res) => {
  const id = req.params.id;
  const q = "delete from amount where id = ?";

  database.query(q, [id], (err, data) => {
    if (err) {
      console.error("Error deleting record:", err);
      return res.status(500).json({ error: "Failed to delete record" });
    }
    console.log("Record deleted successfully");
    return res.json({ message: "Record deleted successfully" });
  });
};

module.exports = {
  getAmountData,
  addAmount,
  editAmount,
  saveAmount,
  deleteAmount,
};
