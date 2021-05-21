const express = require("express");
const router = express.Router();
const Cart = require("../models/cartSchema");
const Product = require("../models/productSchema");
const User = require("../models/userSchema");
const { isLoggedIn } = require("./middleware/authUser");

router.post("/user/cart/:id", isLoggedIn, async (req, res) => {
  try {
    const getProduct = await Product.findById(req.params.id);
    const cartData = await Cart.findOne({
      user: req.user._id,
      details: req.params.id,
    });

    if (cartData === null) {
      const userData = await User.findById(req.user._id);
      let cart = new Cart({ user: req.user._id });

      cart.details = getProduct;

      await cart.save();
      userData.cartDetails.push(cart);

      await userData.save();

      req.flash("success", "Product Added to Cart");
      res.redirect(`/user/cart/${req.user._id}`);
    } else {
      await Cart.findOneAndUpdate(
        { _id: cartData._id },
        {
          $inc: {
            qty: 1,
          },
        }
      );
      req.flash("success", "Your Cart is Updated");
      res.redirect(`/user/cart/${req.user._id}`);
    }
  } catch (error) {
    console.log(error.message);
    req.flash("error", "Failed to add to cart");
  }
});

router.get("/user/cart/:id", isLoggedIn, async (req, res) => {
  try {
    const cartData = await Cart.find({ user: req.user._id }).populate(
      "details"
    );

    res.render("cart/userCart", { cart: cartData });
  } catch (error) {
    console.log(error.message);
    req.flash("error", "Unable to Add this product");
  }
});

router.patch("/cart/update/:id", async (req, res) => {
  let query = req.query.action;
  let params = req.params.id;
  const cartData = await Cart.findById(params);
  const count = cartData.qty;

  if (query === "DEC" && count === 1) {
    req.flash("error", "You have reached your minimum limit");
    res.redirect(`/user/cart/${req.user._id}`);
  } else if (query === "DEC" && count > 1) {
    await Cart.findOneAndUpdate(
      { _id: params },
      {
        $inc: {
          qty: -1,
        },
      }
    );
    req.flash("success", "Your Cart is Updated");
    res.redirect(`/user/cart/${req.user._id}`);
  } else if (query === "INC" && count === 5) {
    req.flash(
      "error",
      "Sorry you can only buy maximum 5 product of this type!!!"
    );
    res.redirect(`/user/cart/${req.user._id}`);
  } else if (query === "INC" && count < 5) {
    await Cart.findOneAndUpdate(
      { _id: params },
      {
        $inc: {
          qty: 1,
        },
      }
    );
    req.flash("success", "Your Cart is Updated");
    res.redirect(`/user/cart/${req.user._id}`);
  }
});

router.delete("/user/cart/:cartID/:userID", async (req, res) => {
  try {
    const { cartID, userID } = req.params;
    await User.findByIdAndUpdate(userID, {
      $pull: { cartDetails: cartID },
    });
    await Cart.findByIdAndDelete(cartID);
    req.flash("success", "Product Deleted Successfully");
    res.redirect(`/user/cart/${userID}`);
  } catch (error) {
    console.log(error.message);
    req.flash("error", "Unable to delete this product");
  }
});

module.exports = router;
