const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const Clan = require("./Routes/Clan");
app.use("/",Clan);

app.listen(4000, () => {
  console.log("listening");
});
