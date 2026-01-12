const express = require("express");
const { createfunction,getfunction,getelementbyID,update,deletefunction } = require("../control/userControl");
const { protect, authorize } = require("../middleware/Authmiddleware");
const router = express.Router();

router.post("/", protect,createfunction);
router.get("/", authorize(),getfunction);
router.get("/:id",authorize(),getelementbyID)
router.patch("/:id",update)
router.delete("/:id",deletefunction)

module.exports = router;
