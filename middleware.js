const { verifyToken } = require("./token");

const authenticate = () => (req, res, next) => {
  console.log("✅ AUTHENTICATE MIDDLEWARE ÇALIŞTI");
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No authHeader or authHeader does not start with Bearer");
      return res
        .status(401)
        .json({ error: "Unauthorized No Authheader or Not Start with Bearer" });
    }

    const token = authHeader.split(" ")[1];
    console.log(
      "SHARED-AUTH PACKAGE authorization mid token bearer heder:",
      token
    );
    const decoded = verifyToken(token);
    console.log("Decoded token:", decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { authenticate };
