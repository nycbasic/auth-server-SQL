const express = require("express");
const router = express.Router();
const auth = require("../middleware");
const { success, testPersist } = require("../controllers/test");

router.get("/success", auth, success);
router.get("/test", testPersist);

module.exports = router;
