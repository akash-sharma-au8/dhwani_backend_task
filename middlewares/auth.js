const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get token from cookies
  const { token } = req.cookies;
  // Check if no token
  if (!token) {
    return res.status(401).json({
      message: "No token found, Auth access denied",
    });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "token is not valid",
    });
  }
};
