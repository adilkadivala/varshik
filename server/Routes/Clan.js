const express = require("express");
const router = express.Router();
const Clan = require("../controller/Clan");
router.get("/clan", Clan.getClanData);
router.post("/addclan", Clan.addClan);
router.get("/editclan/:id", Clan.editClan);
router.put("/saveedit/:id", Clan.saveEdit);
router.delete("/deleteclan/:id", Clan.deleteClan);
module.exports = router;
