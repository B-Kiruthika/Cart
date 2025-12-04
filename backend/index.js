const port=3000
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/shoppingcart");

const uploadDir = './upload/images';
fs.mkdirSync(uploadDir, { recursive: true });

// User Schema
const Users = mongoose.model("Users", {
  username: String,
  email: String,
  password: String,
  role: String, 
  cartData: Object,
});

// Product Schema
const Product = mongoose.model("Product", {
   id: { type: Number, required: true }, 
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
});

// Storage for images
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));
app.post('/upload', upload.single("product"), (req, res) => {
  res.json
  ({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
  })  
})


// Signup
app.post("/signup", async (req, res) => {
  const check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.json({ success: false, errors: "User already exists" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: "user", // Default role for new signups
    cartData: cart,
  });

  await user.save();

  const token = jwt.sign({ email: req.body.email }, "secret");
  res.json({ success: true, token, role: user.role });
});

// Login
app.post("/login", async (req, res) => {
  const user = await Users.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (!user) {
    return res.json({ success: false, errors: "Invalid email or password" });
  }

  // Token includes user role for authorization checks (role determines redirect)
  const token = jwt.sign(
    { email: user.email, role: user.role },
    "secret"
  );

  res.json({
    success: true,
    token:token,
    role: user.role // Send role back for frontend redirection
  });
});

// Middleware (for addtocart,removefromcart)
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.json({ success: false, errors: "Login first" });

  try {
    const data = jwt.verify(token, "secret");
    req.user = data.email;
    next();
  } catch (e) {
    res.json({ success: false, errors: "Invalid token" });
  }
};

// Get All Products
app.get("/allproduct", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Add to Cart
app.post("/addtocart", fetchUser, async (req, res) => {
  const user = await Users.findOne({ email: req.user });
  user.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ email: req.user }, { cartData: user.cartData });
  res.json({ success: true });
});

// Remove from Cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.user });
    const itemId = req.body.itemId;

    // Prevent negative quantities
    if (user.cartData[itemId] > 0) {
      user.cartData[itemId] -= 1;
      await Users.findOneAndUpdate({ email: req.user }, { cartData: user.cartData });
    }

    res.json({ success: true, cartData: user.cartData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// Add Product
app.post("/addproduct", async (req, res) => {
  let products=await Product.find({})
  
  try {
    let lastProduct = await Product.findOne().sort({ id: -1 });
    let id = lastProduct ? lastProduct.id + 1 : 1;
    const product = new Product({
      id:id,
      name: req.body.name,
      image: req.body.image,   // Use image URL from frontend
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    res.json({ success: true ,name:req.body.name,id:id});
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});


// Remove Product (MODIFIED: Deletes using the MongoDB _id)
app.post("/removeproduct", async (req, res) => {
  try {
    // Listproduct.jsx sends product._id as the key 'id'. We treat this as the MongoDB _id string.
    const product_mongo_id = req.body.id; 
    
    // Delete by MongoDB _id (Product._id is implicitly used here)
    await Product.deleteOne({ _id: product_mongo_id }); 

    res.json({ success: true, message: "Product removed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Deletion failed: " + err.message });
  }
});

//getcart
app.post("/getcart", fetchUser, async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.user });
    res.json(user.cartData);
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch cart" });
  }
});

app.post("/updatecart", fetchUser, async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.user });
    user.cartData = req.body.cartData;
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Start Server
app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});