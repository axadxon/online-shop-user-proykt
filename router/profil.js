const { Router } = require("express");
const router = Router();


router.get("/acc", (req,res)=>{
    res.render("profil")
})


module.exports = router;