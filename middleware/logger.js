module.exports = (req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
};
