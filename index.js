const { log } = require("console");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const port = 8080;

const hbs = exphbs.create({
  extname: ".hbs",
  layoutsDir: "views/layouts",
  partialsDir: "views/partials",
  defaultLayout: "main",
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
});

app.engine("hbs", hbs.engine);
app.set("views", "./views");
app.set("view engine", "hbs");

/////   MIDDLEWARE
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

///// DB
require("./helper/db")();

///// ROUTER
app.use("/auth", require("./router/auth"));

app.use((req, res, next) => {
  const User = req.session.user;

  if (!User) {
    res.redirect("/auth/login");
    return
  }

  next();
});

app.use("/", require("./router/home"));
app.use("/profil", require("./router/profil"));
app.use("/computer", require("./router/computers"));
app.use("/contact", require("./router/contact"));
app.use("/mans", require("./router/man"));
app.use("/womans", require("./router/woman"));

app.listen(port, (req, res) => {
  console.log("server working " + port);
});
