import { sign } from "jsonwebtoken";
import User from "../models/UserModel";

// maxAge- where token is expire.
const maxAge = 7 * 24 * 60 * 60 * 1000;

// createToken function using sign method from jsonwebtoken
const createToken = (email, userId) => {
  return sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};

// signup function
const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password require!");
    }

    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
    
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal server error!");
  }
};
