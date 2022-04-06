const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
})

const updateScore = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    res.status(400);

    throw new Error("User not found!");
  }

  const updatedUser = await User.findOneAndUpdate(req.params.id, req.body, { new: true })

  res.status(201).json(updatedUser);
})

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    score: 0,
  });

  if (user) {
    res.status(201).json({ message: "User created" });
  } else {
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    username,
    email,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  getUsers,
  updateScore,
  registerUser,
  loginUser,
  getMe,
};
