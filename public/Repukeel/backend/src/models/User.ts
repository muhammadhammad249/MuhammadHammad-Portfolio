import { Schema, model, models } from "mongoose";

export interface UserDocument {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  resetPasswordTokenHash?: string;
  resetPasswordExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>({
  firstName: { type: String, required: true, trim: true, maxlength: 50 },
  lastName: { type: String, required: true, trim: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  resetPasswordTokenHash: { type: String },
  resetPasswordExpiresAt: { type: Date },
}, { timestamps: true });

export const User = models.User || model<UserDocument>("User", userSchema);
