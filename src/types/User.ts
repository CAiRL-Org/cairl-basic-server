import { Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isSubscribedToNewsletter: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}
