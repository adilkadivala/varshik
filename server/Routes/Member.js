const express = require("express");
const router = express.Router();
const Member = require("../controller/Member");

router.get("/getmember", Member.getMemberData);
router.post("/addmember", Member.addMember);
router.get("/editmember/:id", Member.editMember);
router.put("/savememberEdit/:id", Member.saveEdit);
router.delete("/deletemember/:id", Member.deleteMember);
module.exports = router;
