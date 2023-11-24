const userRoutes = require("./api/user");
const questionRoutes = require("./api/question");
const express = require("express");
const router = express.Router();

router.get("/api/v1", (req, res) => {
  res.send("Hello World!");
});

router.use("/api/v1/user", userRoutes);
router.use("/api/v1/question", questionRoutes);

module.exports = router;
