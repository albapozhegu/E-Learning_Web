const Users = require("../models/userModel");
exports.checkAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });

    if (user.roleType !== "admin")
      return res
        .status(500)
        .json({ message: "Admin resources access denied." });

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.checkInstructor = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });

    if (user.roleType !== "instructor") {
      if (user.roleType !== "admin") {
        return res
          .status(500)
          .json({ message: "Instructor resources access denied." });
      }
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.checkAccess = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    if (user.roleType === "user")
      return res.status(500).json({ message: "Access denied" });
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
