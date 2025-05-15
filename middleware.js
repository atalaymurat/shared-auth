const authenticate = () => (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header SHARED-AUTH PACKAGE:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    console.log("Decoded token:", decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};