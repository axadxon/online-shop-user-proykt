const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.render("woman", {
        title: "Woman's"
    })
});

module.exports = router