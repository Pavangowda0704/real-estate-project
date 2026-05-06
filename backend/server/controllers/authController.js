import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const exists = await User.findOne({ email: normalizedEmail });

    if (exists) {
      return res.status(400).json({
        message: "This email is already registered. Please login instead.",
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: "buyer",
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "This email is already registered. Please login instead.",
      });
    }

    return res.status(500).json({
      message: error.message || "Registration failed",
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase().trim() });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    }

    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Never reveal whether email exists
    if (!user) {
      return res.json({
        message: "If this email exists, password reset instructions have been sent.",
      });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const frontendUrl =
      process.env.FRONTEND_URL || "https://real-estate-project-xi-five.vercel.app";

    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h2>Password Reset Request</h2>
        <p>Hello ${user.name || "User"},</p>
        <p>You requested to reset your RealEstatePro password.</p>
        <p>This link will expire in <strong>15 minutes</strong>.</p>
        <a href="${resetUrl}" style="display:inline-block;background:#2563eb;color:white;padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:bold">
          Reset Password
        </a>
        <p>If you did not request this, you can safely ignore this email.</p>
      </div>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "RealEstatePro Password Reset",
        html,
      });

      res.json({
        message: "If this email exists, password reset instructions have been sent.",
      });
    } catch (emailError) {
      console.error("Email error:", emailError);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      res.status(500).json({
        message: "Email could not be sent. Please check email configuration.",
      });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Forgot password failed" });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      message: "Password reset successful. Please login with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Password reset failed" });
  }
};