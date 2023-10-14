const express = require("express");
const router = express.Router();
const Amount = require("../controller/Amount");

router.get("/amount", Amount.getAmountData);
router.post("/addamount", Amount.addAmount); 

router.get("/geteditamount/:id", Amount.editAmount);
router.put("/saveeditamount/:id", Amount.saveAmount);

router.delete("/deleteamount/:id", Amount.deleteAmount);

module.exports = router;
