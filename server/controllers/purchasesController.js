const express = require("express");
const app = express();
const router = express.Router();
const purchasesServices = require("../services/purchasesService");
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

// Get all purchases
router.get("/", async (req, res) => {
  try {
    const purchases = await purchasesServices.getAllPurchases();
    return res.json(purchases);
  } catch (error) {
    return res.json(error);
  }
});

// Get purchases by product Id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const purchases = await purchasesServices.getAllPurchasesByProduct(id);
  return res.json(purchases);
});

// Post
router.post("/", async (req, res) => {
  const newPurchase = req.body;
  const result = await purchasesServices.addPurchaseOfCustomer(newPurchase);
  return res.json(result);
});

//delete purchases by product Id
router.delete("/productid/:id", async (req, res) => {
  const id = req.params.id;
  const result = await purchasesServices.deletePurchasesByProdId(id);
  return res.json(result);
});

//delete purchases by customer Id
router.delete("/customerid/:id", async (req, res) => {
  const id = req.params.id;
  const result = await purchasesServices.deletePurchasesByCustomerId(id);
  return res.json(result);
});

app.use("/", router);
module.exports = router;
