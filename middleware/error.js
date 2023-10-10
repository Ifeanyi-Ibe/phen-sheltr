const logger = require("./logger");

const notFound = (req, res, next) => {
  const error = new Error(`${req.originalUrl} not found.`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err?.message,
  });
};

module.exports = { errorHandler, notFound };
