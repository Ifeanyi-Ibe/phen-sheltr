const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Api = require("../models/api");

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers?.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Unauthorized. Invalid or expired token.");
    }
  } else {
    throw new Error("Unauthorized. No token found in header");
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.role === "admin") {
      throw new Error("Unauthorized.");
    }
    next();
  } catch (error) {
    throw new Error("Unauthorized.");
  }
};

const validateApiKey = async (req, res, next) => {
  let host = req.headers.origin;
  let providedApiKey = req.headers["api-key"] ?? null;
  console.log("Origin Url", host);
  try {
    if (providedApiKey) {
      console.log("Provided Api key", providedApiKey);
      const service = await Api.findOne({ originUrl: host });
      console.log(service);
      if (service.originUrl == host && service.apiKey == providedApiKey) {
        next();
      } else {
        console.log("Records not found");
      }
    } else {
      throw new Error("Unauthorized. Api key is required.");
    }
  } catch (error) {
    throw new Error("Unauthorized.");
  }
};

module.exports = { authMiddleware, isAdmin, validateApiKey };
