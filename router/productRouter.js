const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema");
const Review = require("../models/reviewSchema");
const { isLoggedIn } = require("./middleware/authUser");

//Display all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("products/index", { products });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});

//get the form for new product
router.get("/products/new", isLoggedIn, async (req, res) => {
  try {
    res.render("products/new");
  } catch (error) {
    console.log(error);
  }
});

//Post product
router.post("/products", isLoggedIn, async (req, res) => {
  try {
    await Product.create(req.body.product);
    req.flash("success", "Product created successfully");
    res.redirect("/products");
  } catch (error) {
    console.log(error);
    req.flash("error", "Product cannot be posted!! Error Occured");
  }
});

//get particular products
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews");
    res.render("products/show", { product });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});

//get edit products
router.get("/products/:id/edit", isLoggedIn, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("products/edit", { product });
  } catch (error) {
    console.log(error);
  }
});

//update products
router.patch("/products/:id", isLoggedIn, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body.product
    );
    req.flash("success", "Product updated successfully");
    res.redirect(`/products/${req.params.id}`);
  } catch (error) {
    console.log(error);
    req.flash("error", "Cannot update product!! Error Ocured");
  }
});

//Delete the product
router.delete("/products/:id", isLoggedIn, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    req.flash("success", "Product deleted successfully");
    res.redirect("/products");
  } catch (error) {
    console.log(error);
    req.flash("error", "Cannot delete product!! Error Occured");
  }
});

//Creating new comment
router.post("/products/:id/review", isLoggedIn, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const review = new Review({ user: req.user.username, ...req.body });

    product.reviews.push(review);

    product.save();
    review.save();
    req.flash("success", "Comment posted successfully");
    res.redirect(`/products/${req.params.id}`);
  } catch (error) {
    console.log(error);
    req.flash("error", "Cannot post comment!! Error Occured");
  }
});

// router.get("*", (req, res) => {
//   res.render("error");
// });

module.exports = router;
