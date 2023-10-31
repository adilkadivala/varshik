const express = require("express");
const database = require("../DataBase/Connection");

//get clan data
const getClanData = async (req, res) => {
  const sql = "SELECT * FROM clan";
  database.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
};

// add clan data
const addClan = async (req, res) => {
  const { clan_name } = req.body;

  const checkQuery = "SELECT * FROM clan WHERE clan_name = ?";
  const checkData = [clan_name];

  database.query(checkQuery, checkData, (checkErr, checkResult) => {
    if (checkErr) {
      return res.status(500).json(checkErr);
    }

    if (checkResult.length > 0) {
      return res.status(400).json({ error: "This clan already exists." });
    }

    const insertQuery = "INSERT INTO clan (clan_name) VALUES (?)";
    const insertData = [clan_name];

    database.query(insertQuery, insertData, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(data);
    });
  });
};

//edit popup
const editClan = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * from clan where id=?";
  const data = [id];

  database.query(q, data, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

// save Edit

// const saveEdit = (req, res) => {
//   const id = req.params.id;
//   const { clan_name } = req.body;

//   if (!clan_name || clan_name.trim() === "") {
//     return res.status(400).json({ error: "clan_name is required" });
//   }

//   const sql = "UPDATE clan SET clan_name=? WHERE id=?";
//   const data = [clan_name, id];

//   console.log("Executing SQL query:", sql, "with data:", data);

//   database.query(sql, data, (err, result) => {
//     if (err) {
//       console.error("Error updating record:", err);
//       return res.status(500).json({ error: "Error updating record" });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Record not found" });
//     }

//     res.sendStatus(200);
//   });
// };

const saveEdit = (req, res) => {
  const id = req.params.id;
  const { clan_name } = req.body;

  if (!clan_name || clan_name.trim() === "") {
    return res.status(400).json({ error: "Clan name is required" });
  }

  const checkQuery = "SELECT * FROM clan WHERE clan_name = ? AND id <> ?";
  const checkData = [clan_name, id];

  database.query(checkQuery, checkData, (checkErr, checkResult) => {
    if (checkErr) {
      return res.status(500).json(checkErr);
    }

    if (checkResult.length > 0) {
      return res.status(400).json({ error: "This clan name already exists" });
    }

    const sql = "UPDATE clan SET clan_name=? WHERE id=?";
    const data = [clan_name, id];

    console.log("Executing SQL query:", sql, "with data:", data);

    database.query(sql, data, (err, result) => {
      if (err) {
        console.error("Error updating record:", err);
        return res.status(500).json({ error: "Error updating record" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Record not found" });
      }

      res.sendStatus(200);
    });
  });
};


//delet
const deleteClan = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM clan WHERE id = ?";
  const data = [id];

  database.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error deleting record:", err);
      return res.status(500).json({ error: "Failed to delete record" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    console.log("Record deleted successfully");
    return res.json({ message: "Record deleted successfully" });
  });
};

module.exports = { getClanData, addClan, editClan, saveEdit, deleteClan };
