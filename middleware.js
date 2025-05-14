const { verifyToken } = require("./token");

const authenticate = (UserModel) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const user = await UserModel.findById(decoded.userId).select(
      "_id email name profilePicture roles isActive createdAt preferences firebaseUid emailVerified"
    );

    if (!user || !user.isActive) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticate;