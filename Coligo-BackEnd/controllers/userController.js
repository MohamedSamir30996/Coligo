const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      usersLength: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "failed",
      err,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Failed to get user",
      error: err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    let { username, password, email } = req.body;
    username = username.toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(402).json({ message: "Email already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "server error",
    });
  }
};


exports.getUserByEmail = async (req, res) => {
  var email = req.query.email;
  try {
    var user = await User.findOne({ email: email });
    if (!user) {
      res.status(201).json();
    } else {
      res.status(201).json(user);
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  let data = req.body;
  delete data.confirmPassword;
  try {
    const { password, confirmPassword } = req.body;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      req.body.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "success",
      token,
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to update user",
      error: err.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) next(err);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "failed",
      err,
    });
  }
};

exports.login = async (req, res, next) => {
  let { username, password } = req.body;
  username = username.toLowerCase();
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid username or password");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid email or password");
    }
    jwt.sign({ userId: user._id, username }, jwtSecret, {}, (err, token) => {
      res
        .cookie("token", token, { sameSite: "None", secure: true })
        .status(200)
        .json({
          message: "success",
          user,
        });
    });
  } catch (err) {
    res.status(401).json({
      message: "Login failed",
      error: err.message,
    });
  }
};

exports.profile = async (req, res, next) => {
  const token = req.cookies?.token;
  try {
    if (token) {
      jwt.verify(token, jwtSecret, {}, (err, data) => {
        if (err) throw err;
        res.json(data);
      });
    }
  } catch (err) {
    res.status(400).json("NO TOKEN");
  }
};

exports.logout = async (req, res, next) => {
  res
    .cookie("token", "", { sameSite: "None", secure: true })
    .json("Logged out");
};
