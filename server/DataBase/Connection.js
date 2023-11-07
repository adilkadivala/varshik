const mysql = require('mysql');



const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "varshik",
  });


module.exports = database;