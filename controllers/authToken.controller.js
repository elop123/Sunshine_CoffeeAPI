"use strict";
const { v4: uuidv4 } = require("uuid");
const db = require("../models");

// Function to verify expiration on token
exports.verifyExpiration = (token) => {
  return Number(token.expiryDate) < Date.now();
};

// Function to create a new JWT and refresh
exports.createToken = async function (user) {
  const expiredAt = new Date();
  expiredAt.setSeconds(
    expiredAt.getSeconds() + Number(process.env.JWT_REFRESH_EXPIRATION || 86400)
  );

  const _token = uuidv4();
  
  let refreshToken = await db.AuthToken.create({
    token: _token,
    user: user.id,
    expiryDate: expiredAt.getTime(),
  });
  return refreshToken.token;
};
