import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let authHeader = req.headers.authorization;

  // 1. Check if header exists
  if (!authHeader) {
    return res.status(401).json({ message: "No token, not authorized" });
  }

  // 2. Check format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    // 3. Extract token
    const token = authHeader.split(" ")[1];

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message); // 🔥 IMPORTANT DEBUG
    return res.status(401).json({ message: "Token failed" });
  }
};