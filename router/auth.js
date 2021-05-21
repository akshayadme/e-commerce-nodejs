const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/userSchema");

router.get("/register", (req, res) => {
  res.render("auth/signup");
});

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
    });

    const get = await User.register(user, req.body.password);
    req.flash("success", "Registered Successfully!!");
    res.redirect("/register");
  } catch (e) {
    req.flash("error", e.message);
    console.log(e.message);
  }
});

router.get("/login", async (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username} !!`);
    res.redirect("/products");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged Out Successfully");
  res.redirect("/login");
});

module.exports = router;
