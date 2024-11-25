import { Schema, Document } from 'mongoose';

export interface UserToken extends Document {
  userId: string;
  token: string;
  email: string;
  generatedAt: Date;
  expiresAt: Date;
}
export const UserTokenSchema = new Schema<UserToken>({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  email: { type: String, required: true },
  generatedAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
});
