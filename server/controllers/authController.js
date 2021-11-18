const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authServices = require("../services/authService");

// Entry point: 'http://localhost:3000/auth'

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await authServices.getUsernameAndPasswordOfUser(
    username,
    password
  );

  if (user.length > 0) {
    const userId = "key";

    const ACCESS_SECRET_TOKEN = "someKey";

    const accessToken = jwt.sign(
      { id: userId },
      ACCESS_SECRET_TOKEN,
      { expiresIn: 7200 } // expires after 2 hours (optional)
    ); // Get Access Token

    return res.json({ accessToken, role: user[0].role });
  }

  return res.status(401).json(); // Unauthorized
});

module.exports = router;
