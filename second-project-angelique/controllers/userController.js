import bcrypt from "bcrypt";
import User from "../models/userModels.js"
const signupController = async (req, res) => {
     try {
          const { username, password } = req.body;
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({
               username,
               password: hashedPassword,
          });
          await user.save();
          res.status(201).json({
               success: true,
               message: "User created successfully",
          });
     } catch (error) {
          res.status(500).json({
               success: false,
               message: error.message,
          });
     }
};

const Login = async (req, res) => {
     try {
          const { username, password } = req.body;
          const user = await User.findOne({ username });
          if (!user) {
               return res.status(404).json({
                    success: false,
                    message: "User not found",
               });
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
               return res.status(401).json({
                    success: false,
                    message: "Invalid password",
               });
          }

          res.status(200).json({
               success: true,
               message: "User logged in successfully",
          });
     } catch (error) {

          res.status(500).json({
               success: false,
               message: error.message,
          });
     }
};

export { signupController, Login }
