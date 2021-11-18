const express = require("express");
const app = express();
const router = express.Router();
const customersServices = require("../services/customersService");
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

// Get All Customers
router.get("/", async (req, res) => {
  try {
    const customers = await customersServices.getAllCustomers();
    return res.json(customers);
  } catch (error) {
    return res.json(error);
  }
});

// Get customer by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await customersServices.getCustomerById(id);
  return res.json(customer);
});

// Update customer
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedCustomer = req.body;
  const result = await customersServices.updateCustomer(id, updatedCustomer);
  return res.json(result);
});

// Delete customer
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await customersServices.deleteCustomer(id);
  return res.json(result);
});

app.use("/", router);
module.exports = router;
