import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { env } from "../config/env";
import { sendPasswordResetEmail } from "../services/emailService";

const scrypt = promisify(scryptCallback);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function passwordMatches(password: string, storedHash: string) {
  const [salt, storedKey] = storedHash.split(":");
  if (!salt || !storedKey) return false;
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return timingSafeEqual(derivedKey, Buffer.from(storedKey, "hex"));
}

const publicUser = (user: { _id: unknown; firstName: string; lastName: string; email: string }) =>
  ({ id: String(user._id), firstName: user.firstName, lastName: user.lastName, email: user.email });

const tokenFor = (userId: unknown) => jwt.sign({ sub: String(userId) }, env.JWT_SECRET, { expiresIn: "7d" });
const hashResetToken = (token: string) => createHash("sha256").update(token).digest("hex");

export async function register(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body as Record<string, string>;
  const normalizedEmail = email?.trim().toLowerCase();
  if (!firstName?.trim() || !lastName?.trim() || !normalizedEmail || !password) return res.status(400).json({ message: "Please complete every field." });
  if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) return res.status(400).json({ message: "Enter a valid email address." });
  if (password.length < 8) return res.status(400).json({ message: "Password must contain at least 8 characters." });

  try {
    if (await User.exists({ email: normalizedEmail })) return res.status(409).json({ message: "An account with this email already exists. Please sign in." });
    const user = await User.create({ firstName: firstName.trim(), lastName: lastName.trim(), email: normalizedEmail, passwordHash: await hashPassword(password) });
    return res.status(201).json({ token: tokenFor(user._id), user: publicUser(user) });
  } catch (error) {
    if ((error as { code?: number }).code === 11000) return res.status(409).json({ message: "An account with this email already exists. Please sign in." });
    return res.status(500).json({ message: "Unable to create your account. Please try again." });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as Record<string, string>;
  if (!email?.trim() || !password) return res.status(400).json({ message: "Enter your email address and password." });
  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(404).json({ message: "This email is not registered. Please register your email first." });
    if (!(await passwordMatches(password, user.passwordHash))) return res.status(401).json({ message: "Incorrect password. Please try again." });
    return res.status(200).json({ token: tokenFor(user._id), user: publicUser(user) });
  } catch {
    return res.status(500).json({ message: "Unable to sign in. Please try again." });
  }
}

export async function requestPasswordReset(req: Request, res: Response) {
  const email = (req.body as Record<string, string>).email?.trim().toLowerCase();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: "Enter a valid email address." });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "This email is not registered. Please register your email first." });

    const resetToken = randomBytes(32).toString("hex");
    user.resetPasswordTokenHash = hashResetToken(resetToken);
    user.resetPasswordExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();
    const resetUrl = `${env.CLIENT_URL}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(user.email, user.firstName, resetUrl);
    return res.status(200).json({ message: "A password reset link has been sent to your email." });
  } catch {
    return res.status(500).json({ message: "Unable to send a reset link right now. Please try again." });
  }
}

export async function resetPassword(req: Request, res: Response) {
  const { token, password } = req.body as Record<string, string>;
  if (!token || !password) return res.status(400).json({ message: "Reset token and new password are required." });
  if (password.length < 8) return res.status(400).json({ message: "Password must contain at least 8 characters." });

  try {
    const user = await User.findOne({ resetPasswordTokenHash: hashResetToken(token), resetPasswordExpiresAt: { $gt: new Date() } });
    if (!user) return res.status(400).json({ message: "This reset link is invalid or has expired. Request a new one." });
    user.passwordHash = await hashPassword(password);
    user.resetPasswordTokenHash = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    return res.status(200).json({ message: "Password updated. You can now sign in." });
  } catch {
    return res.status(500).json({ message: "Unable to reset your password. Please try again." });
  }
}
