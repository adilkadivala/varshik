const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
// const session = require ("express-session")
// const flash = require ("express-flash")
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
  
// setting middelware for showing notifications

// app.use(session({
//   secret : "Secret",
//   resave: true,
//   saveUninitialized: true
// }));

// app.use(flash());

// app.use((req,res,next)=>{
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error")
// });

// server site port
app.listen(4000, () => {
  console.log("server started");
});
