const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.render("man", {
        title: "Man's"
    })
});

module.exports = router