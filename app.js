const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const seedDB = require("./seed");
const methodOverride = require("method-override");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userSchema");
const PORT = process.env.PORT || 3000;

const indexRouter = require("./router/indexRouter");
const productRouter = require("./router/productRouter");
const authRouter = require("./router/auth");
const cartRouter = require("./router/cartRouter");

mongoose
  .connect("mongodb://localhost:27017/ecommerce", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error occured", err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));

// app.use(cookieParser());

const sessionConfig = {
  secret: "weneedsomebettersecret",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionConfig));
app.use(flash());

//initializing pasport and session for storingthe user information
app.use(passport.initialize());
app.use(passport.session());

//configuring passport to use local strategy
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.User = req.user;
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use(indexRouter);
app.use(productRouter);
app.use(authRouter);
app.use(cartRouter);

// seedDB();

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
