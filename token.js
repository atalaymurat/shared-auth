const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: "60m" },
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  createToken,
  verifyToken,
};
