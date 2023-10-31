const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// clan import
const Clan = require("./Routes/Clan");
app.use("/",Clan);


// Amount import

const Amount = require("./Routes/Amount");
app.use("/",Amount);


// Member import

const Member = require ("./Routes/Member");
app.use("/",Member);



app.listen(4000, () => {
  console.log("server started");
});
