const jwt = require("jsonwebtoken");

const createToken = (user) => {
  console.log("USER TO CREATE TOKEN", user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      roles: user.roles,
      applicationId: user.applicationId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "60m" }
  );
};

const verifyToken = (token) => {
  console.log("TOKEN TO VERIFY", token);
  try {
    const res = jwt.verify(token, process.env.JWT_SECRET);
    console.log("VERIFIED TOKEN:", res);
    return res;
  } catch (err) {
    console.error("Token verification error:", err?.message);
    throw err;
  }
};

module.exports = {
  createToken,
  verifyToken,
};
