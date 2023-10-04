const express = require("express");
const router = express.Router();
const Clan = require("../controller/Clan");
router.get("/clan", Clan.getClanData);
module.exports = router;