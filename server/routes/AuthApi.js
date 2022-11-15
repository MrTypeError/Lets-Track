import { Router } from "express";
const router = Router();

router.post("/register", (req, res) => {
  //get all form data
  //check if user exists with same email
  //hash the passward
  //store user
  res.json({ message: "New User Created !!! " });
});

export default router;
