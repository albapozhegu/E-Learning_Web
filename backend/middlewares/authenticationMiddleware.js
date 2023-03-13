const jwt = require('jsonwebtoken')
exports.authentication = (req, res, next) => {
  try {
    res.locals.isAuth = false;
    let token = req.cookies ? req.cookies.token : null;
    if (!token) {
      next();
      return;
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(400).json({ message: "Invalid Authentication." });

      res.locals.isAuth = true;
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};