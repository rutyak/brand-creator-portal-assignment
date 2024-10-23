const User = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCreateController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    const user = await User.findOne({ email, role });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res
          .status(200)
          .json({ message: "Login successful", user: user, token });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid credentials: Incorrect password" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Invalid credentials: User not found" });
    }
  } catch (error) {
    console.error("Error in userCreateController:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = userCreateController;
