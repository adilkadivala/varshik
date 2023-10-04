const express = require("express");
const db = require("../DataBase/Connection");

const getClanData = async (req, res) => {
  const sql = "SELECT * FROM clan";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
};

module.exports = { getClanData };