const express = require("express");
const app = express();
const router = express.Router();
const productsServices = require("../services/productsService");
const jwt = require("jsonwebtoken");

router.use(function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided" });
  }
  const ACCESS_TOKEN_SECRET = "someKey";
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    //role = decoded.role;
    next();
  } catch (ex) {
    res.status(401).send("Invalid Token");
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await productsServices.getAllProducts();
    return res.json(products);
  } catch (error) {
    return res.json(error);
  }
});

//get product by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productsServices.getProductById(id);
    return res.json(product);
  } catch (error) {
    return res.json(error);
  }
});

//get all products by id of customer
router.get("/customerid/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const products = await productsServices.getAllProductsByIdCustomer(
      customerId
    );
    return res.json(products);
  } catch (error) {
    return res.json(error);
  }
});

// Update product
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  const result = await productsServices.updateProduct(id, updatedProduct);
  return res.json(result);
});

// Delete product
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await productsServices.deleteProduct(id);
  return res.json(result);
});

app.use("/", router);
module.exports = router;
