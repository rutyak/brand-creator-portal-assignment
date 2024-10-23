const User = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

const userCreateController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email, role });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist !!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const obj = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    const newUser = await User.create(obj);
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser, token:token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = userCreateController;
