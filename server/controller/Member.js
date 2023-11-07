const express = require("express");
const database = require("../DataBase/Connection");



// get data
const getMemberData = (req, res) => {
  const sql = `
  SELECT member.*, clan.clan_name
  FROM member
  INNER JOIN clan ON member.clan_id = clan.id;
`;
  database.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
};

// Add Member
const addMember = async (req, res) => {
  
  const {
    sur_name,
    first_name,
    last_name,
    joining_date,
    mobile_number,
    clan_id,
  } = req.body;

  // console.log("AddMember");

  const q =
    "INSERT INTO member ( sur_name, first_name, last_name, joining_date, mobile_number, clan_id) VALUES (?, ?, ?, ?, ?, ?)";
  const data = [
    sur_name,
    first_name,
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

//  Edit Member
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
//save edit
const saveEdit = (req, res) => {
  const id = req.params.id;
  const {
    sur_name,
    first_name,
    last_name,
    joining_date,
    mobile_number,
    clan_id,
  } = req.body;
  console.log('clan_id',clan_id)

  const sql = `
    UPDATE member 
    SET sur_name=?, first_name=?, last_name=?, joining_date=?, mobile_number=?, clan_id=?
    WHERE id = ?`;

  const data = [
    sur_name,
    first_name,
    last_name,
    joining_date,
    mobile_number,
    clan_id,
    id,
  ];
  // console.log(data);

  database.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

// delete member
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
