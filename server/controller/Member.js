const express = require("express");
const database = require("../DataBase/Connection");

const getMemberData = (req, res) => {
  const sql = "SELECT * FROM member";
  database.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
};

const addMember = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    joining_date,
    mobile_number,
    clan_id,
  } = req.body;

  console.log("AddMember");

  const q =
    "INSERT INTO member (first_name, middle_name, last_name, joining_date, mobile_number, clan_id) VALUES (?, ?, ?, ?, ?, ?)";
  const data = [
    first_name,
    middle_name,
    last_name,
    joining_date,
    mobile_number,
    clan_id,
  ];

  database.query(q, data, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error adding member" });
    }
    return res.json({ success: "Member added successfully" });
  });
};

const editMember = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * from member where id=?";
  const data = [id];

  database.query(q, data, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

// Save Edit Member
const saveEdit = (req, res) => {
  console.log("object");
  const id = req.params.id;
  console.log(id);
  const { first_name, middle_name, last_name, joining_date, mobile_number } =
    req.body;

  const sql = `
    UPDATE member 
    SET first_name=?, middle_name=?, last_name=?, joining_date=?, mobile_number=?
    WHERE id = ?`;

  const data = [
    first_name,
    middle_name,
    last_name,
    joining_date,
    mobile_number,
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

const deleteMember = async (req, res) => {
  const id = req.params.id;
  const q = "delete from member where id = ?";

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
  getMemberData,
  addMember,
  editMember,
  saveEdit,
  deleteMember,
};
