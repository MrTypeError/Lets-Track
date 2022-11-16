import { Router } from "express";
import User from "../models/User.js";
const router = Router();
import bcrypt from "bcrypt";

router.post("/register", async (req, res) => {
  //get all form data
  const { email, password, name, firstName, lastName } = req.body;

  //check if user exists with same email
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(406).json({ message: "User Already Exists !!! " });
    return;
  }

  //hash the password
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  // console.log(hashedPassword);

  //store user
  const user = await User({ email, password, name, firstName, lastName });
  await user.save();
  res.status(201).json({ message: "New User Created !!! " });
});

export default router;
