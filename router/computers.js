const { Router } = require("express");
const router = Router();
const Computer = require("../model/Computers");
const upload = require("../middleware/file-upload");

router.get("/", async (req, res) => {
  const computer = await Computer.find();
  // console.log(computer);
  res.render("computer", {
    title: "Computers",
    computer,
  });
});

router.get("/create/admin/axadxon", async (req, res) => {
  res.render("create-computer", {
    title: "Create-Computer",
  });
});

router.post("/create/admin/axadxon",upload.single('img') , async (req, res) => {
  const computer = new Computer({
    type: req.body.type,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    img: req.file
  });
  await computer.save();
  res.status(201).send("qo`shildi!");
});

module.exports = router;
