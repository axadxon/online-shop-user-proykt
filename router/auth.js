const { Router } = require("express");
const router = Router();
const User = require("../model/Users");
const bcrypt = require("bcryptjs");
const hash = bcrypt.hashSync("bacon", 10);

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    layout: "auth",
  });
});

router.post("/register", async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  console.log(hashPassword);

  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    password: hashPassword,
    username: req.body.username,
  });

  await user.save();
  res.redirect("/auth/login");
  // res.redirect("../index")
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "login",
    // layout:'main'`
  });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    res.status(400).send("username is not true");
    return;
  }

  // const compare = await bcrypt.compare(
  //   // user.password,
  //   req.body.password,
  //   hash,

  //   (err, success) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       return success;
  //     }
  //   }
  // );

  const compare = await bcrypt.compare(req.body.password, user.password);

  console.log(compare);

  if (!compare) {
    res.status(400).send("password is not true");
    return;
  }

  req.session.user = true;

  res.redirect("/");
});

router.get("/logout", (req, res) => {
  // req.session.user = false;

  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

module.exports = router;
