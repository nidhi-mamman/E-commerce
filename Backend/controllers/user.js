const User = require("../model/user");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const signUp = async (req, res) => {
  try {
    //regex
    const namePattern = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
    const emailPattern = /^[a-zA-Z0-9._]+@(gmail\.com|yahoo\.com)$/;
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,12}$/;

    const { name, email, password } = req.body;

    if (!namePattern.test(name) || name.length === 0) {
      return res.status(400).json({
        msg: "Name can only contain letters and it cannot be empty.",
      });
    }
    if (!emailPattern.test(email) || email.length === 0) {
      return res.status(400).json({
        msg: "Email is not in required format and it is required.",
      });
    }
    if (!passwordPattern.test(password) || password.length === 0) {
      return res.status(400).json({
        msg: "Password must have atleast 8 to 12 characters containing special symbols,uppercase,lowercase letters and digits.",
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists.",
      });
    }

    const encPassword = await bycrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: encPassword,
    });
    if (user) {
      return res.status(201).json({
        msg: "Signed up successfully",
        user: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(300).json({
        msg: "User not found",
      });
    }
    const passwordMatch = await bycrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = await jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_sECRET,
        { expiresIn: "9999d" }
      );
      return res.status(200).json({
        msg: "Signed In successfully",
        token: token,
      });
    } else {
      return res.status(400).json({
        msg: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({
      userData,
    });
  } catch (error) {
    console.log(error);
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const emailService = email.includes("@gmail.com")
      ? "gmail"
      : email.includes("@yahoo.com")
      ? "yahoo"
      : null;

    if (!emailService) {
      return res.status(400).json({
        msg: "Unsupported email domain. Only Gmail and Yahoo are supported.",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const transporter = nodemailer.createTransport({
      service: emailService,
      secure: true,
      auth: {
        user: "nidhimamman3@gmail.com",
        pass: "wkosdasrtvlmnzga",
      },
      logger: true,
      debug: true,
    });
    let info = await transporter.sendMail({
      from: "nidhimamman3@gmail.com",
      to: req.body.email,
      subject: "OTP for resetting password",
      text: otp.toString(),
    });

    if (info.messageId) {
      await User.updateOne({ email: req.body.email }, { otp: otp });
      return res.status(200).json({ msg: "OTP sent successfully" });
    } else {
      return res.status(400).json({ msg: "Error sending otp" });
    }
  } catch (error) {
    console.error("Error in sendOtp:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const submitOtp = async (req, res) => {
  try {
    let { otp } = req.body;
    otp = Math.floor(1000 + Math.random() * 9000);
    const user = await User.findOne({ otp: req.body.otp });

    if (!user) {
      return res.status(404).json({ msg: "Otp not sent" });
    }

    const hashPassword = await bycrypt.hash(req.body.password, 10);
    await User.updateOne(
      { email: user.email },
      {
        $set: { password: hashPassword },
        $unset: { otp: "" },
      }
    )
      .then((result) => {
        return res.status(200).json({ msg: "Password updated successfully" });
      })
      .catch((error) => {
        return res.status(400).json({ msg: "Error updating password" });
      });
  } catch (error) {
    console.error("Error in sendOtp:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { signUp, signIn, getUser, sendOtp, submitOtp };
