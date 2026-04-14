const db = require("../models");
const User = db.User;
const Auth = db.AuthToken;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createToken,
  verifyExpiration,
} = require("../controllers/authToken.controller");

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json("Email is already associated with an account");
    }

    await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    return res.status(200).json("Registration successful");
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json("Error in registering user: " + err.message);
  }
};

// Sign in
exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const USER = await User.findOne({
      where: { email },
    });

    if (!USER) {
      return res.status(404).json("Email not found");
    }

    const passwordValid = await bcrypt.compare(password, USER.password);

    if (!passwordValid) {
      return res.status(401).json("Incorrect email or password");
    }

    const token = jwt.sign(
      { id: USER.id, email: USER.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = await createToken(USER);

    return res.status(200).json({
      id: USER.id,
      email: USER.email,
      accessToken: token,
      refreshToken,
    });
  } catch (err) {
    console.error("Sign in error:", err);
    return res.status(500).json("Sign in error: " + err.message);
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (!requestToken) {
    return res.status(403).json("Refresh Token is required!");
  }

  try {
    const refreshToken = await Auth.findOne({
      where: { token: requestToken },
    });

    if (!refreshToken) {
      return res.status(403).json("Invalid refresh token");
    }

    if (verifyExpiration(refreshToken)) {
      await Auth.destroy({ where: { id: refreshToken.id } });
      return res
        .status(403)
        .json("Refresh token was expired. Please make a new sign in request");
    }

    const user = await User.findOne({
      where: { id: refreshToken.user },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json("User not found");
    }

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(500).json("Internal server error");
  }
};
