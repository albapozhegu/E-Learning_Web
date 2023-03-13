const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailConfig = require("../configs/mailConfig");
const { uploadImage } = require("../services/commonService");
const { cloudinary } = require("../configs/cloudinaryConfig");
const fs = require("fs");

const { CLIENT_URL } = process.env;

const { updateUserCoin } = require("../services/userService");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = {
      name,
      email,
      password: passwordHash,
    };
    const activation_token = createActivationToken(newUser);
    const url = `${CLIENT_URL}/user/activate/${activation_token}`;
    mailConfig.sendEmail(email, mailConfig.activationEmail(url));
    return res.status(200).json({
      message: "Register successfully! Please activate your email to start",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );

    const { name, email, password } = user;

    const newUser = new Users({
      name,
      email,
      password,
    });

    await newUser.save();

    return res.status(200).json({
      message: "Account has been activated",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user || user.isLocked === -1)
      return res.status(400).json({ message: "This email does not exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password is incorrect" });
    if (user.isLocked === 1)
      return res.status(400).json({ message: "Account is locked" });

    const refresh_token = createRefreshToken({ id: user._id });
    res.cookie("token", refresh_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 3600 * 1000),
    });

    return res.json({
      user,
      message: "Login successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAccessToken = async (req, res) => {
  try {
    const rf_token = req.cookies.token;
    if (!rf_token)
      return res.status(400).json({ message: "Please login now!" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ message: "Please login now!" });

      const access_token = createAccessToken({ id: user.id });
      res.json({ access_token });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "This email does not exist" });

    const access_token = createAccessToken({ id: user._id });
    const url = `${CLIENT_URL}/user/reset/${access_token}`;
    mailConfig.sendEmail(email, mailConfig.resetPasswordMail(url));
    return res
      .status(200)
      .json({ message: "Mail has been sent, please check your email" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, access_token } = req.body;
    const user = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
    const passwordHash = await bcrypt.hash(password, 12);
    await Users.findOneAndUpdate(
      { _id: user.id },
      {
        password: passwordHash,
      }
    );
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: passwordHash,
      }
    );
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { isAuth } = res.locals;
    if (!isAuth) {
      return res.status(400).json({ message: "Get user information failed" });
    }
    const user = await Users.findById(req.user.id);
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      {
        name,
        avatar,
      }
    );
    return res.status(200).json({ message: "Updated profile successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    const file = req.files.file;
    cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: "english/avatar",
        resource_type: "image",
        width: 150,
        height: 150,
        crop: "fill",
      },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);
        return res.status(200).json({ url: result.secure_url });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Logout failed" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getTopCoin = async (req, res) => {
  try {
    const users = await Users.find().sort({ coin: -1 });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await Users.findById(req.params.user_id);
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.lockUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const id = req.params.user_id;
    if (user.id === id) {
      return res
        .status(400)
        .json({ message: `Can't lock account that logged in the system` });
    }
    await Users.findOneAndUpdate(
      { _id: id },
      {
        isLocked: 1,
      }
    );
    return res.status(200).json({ message: "Account has been locked" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.unlockUser = async (req, res) => {
  try {
    await Users.findOneAndUpdate(
      { _id: req.params.user_id },
      {
        isLocked: 0,
      }
    );
    return res.status(200).json({ message: "Account has been unlocked" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await Users.findOneAndUpdate(
      { _id: req.params.user_id },
      {
        isLocked: -1,
      }
    );
    return res.status(200).json({ message: "Account has been deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, avatar, role } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email already exists" });
    }
    let avatarUrl = null;
    if (avatar) {
      if (avatar.includes("cloudinary")) {
        avatarUrl = avatar;
      } else {
        avatarUrl = await uploadImage(avatar, "english/avatar");
      }
    }
    const passwordHash = await bcrypt.hash("123456", 12);
    const newUser = new Users({
      name,
      email,
      password: passwordHash,
      avatar: avatarUrl,
      roleType: role,
    });
    await newUser.save();
    return res.status(200).json({
      message: "Create account successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { name, email, avatar, role, initEmail } = req.body;
    if (email !== initEmail) {
      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "This email already exists" });
      }
    }
    let avatarUrl = null;
    if (avatar) {
      if (avatar.includes("cloudinary")) {
        avatarUrl = avatar;
      } else {
        avatarUrl = await uploadImage(avatar, "english/avatar");
      }
    }
    await Users.findOneAndUpdate(
      { _id: req.params.user_id },
      {
        name,
        email,
        avatar: avatarUrl,
        roleType: role,
      }
    );

    return res.status(200).json({
      message: "Update account successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.putUpdateUserCoin = async (req, res) => {
  try {
    const { newCoin } = req.body;
    
    const id = req.user?.id;
    console.log(id)
    if (!id) {
      return res.status(406).json({ message: "Not Accept" });
    }

    const update = await updateUserCoin(newCoin, id);
    if (update) {
      return res.status(200).json({ message: "success" });
    }

    return res.status(406).json({ message: "Not Accept" });
  } catch (error) {
    console.error("PUT UPDATE USER COIN ERROR: ", error);
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
