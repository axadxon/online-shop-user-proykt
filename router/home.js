const { Router } = require("express");
const router = Router();
const Computer = require("../model/Computers");


router.get("/", async (req, res) => {
  const computer = await Computer.find();

  res.render("index", {
    title: "Home",
    computer,
    
  });
});

module.exports = router;
