const mongoose = require("mongoose");
const Product = require("./models/productSchema");

const products = [
  {
    name: "Iphone12",
    img:
      "https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=359&q=80",
    price: 120000,
    subheading: "Iphone 12 max pro in Iphone",
    desc:
      "The iPhone is a smartphone developed by Apple. ... The iPhone has a sleek, minimalist design, and differs from other smartphones in its lack of buttons. Most operations on the iPhone are performed using the touch screen display.",
  },
  {
    name: "Macbook Air",
    img:
      "https://images.unsplash.com/photo-1493020258366-be3ead1b3027?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 220000,
    subheading: "Macbook air 2 in Laptops",
    desc:
      "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage.",
  },
  {
    name: "Fastrack Watch",
    img:
      "https://images.unsplash.com/flagged/photo-1554692938-b59814c27db8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    price: 2000,
    subheading: "Smart watch in Watches",
    desc:
      "Fastrack, is an Indian fashion accessory retail brand in India. The company was launched in 1998 as a sub-brand of Titan Watches.",
  },
  {
    name: "Boat Headphones",
    img:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    price: 5000,
    subheading: "Wireless over head in Headphone",
    desc:
      "boAt BassHeads 225 polished metal earphones are designed to give you an experience which no other brand can match. It has an incredible sonic clarity with super extra bass. It is not a plastic earphone - it is polished metal. ... As the headphones feature 10mm drivers, they give you clear sound with that thumping bass.",
  },
];

const seedDB = async () => {
  await Product.insertMany(products);
  console.log("DB Seeded");
};

module.exports = seedDB;
