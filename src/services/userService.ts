import User from '../models/User';
import { UserDocument } from '../types/User';
import generateToken from '../utils/generateToken';
import logger from '../utils/logger';

interface AuthResponse {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  isSubscribedToNewsletter: boolean;
  token: string;
}

const authenticateUser = async (email: string, password: string): Promise<AuthResponse | null> => {
  const user: UserDocument | null = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    logger.info(`User logged in: ${user.email}`);
    return {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      isSubscribedToNewsletter: user.isSubscribedToNewsletter,
      token: generateToken(user._id.toString()),
    };
  }
  return null;
};

const registerNewUser = async (username: string, email: string, password: string): Promise<AuthResponse | null> => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    return null; // User already exists
  }

  const user: UserDocument = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    logger.info(`User registered: ${user.email}`);
    return {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      isSubscribedToNewsletter: user.isSubscribedToNewsletter,
      token: generateToken(user._id.toString()),
    };
  }
  return null; // Invalid user data
};

const getAllUsers = async (): Promise<UserDocument[]> => {
  const users = await User.find({});
  return users;
};

export { authenticateUser, registerNewUser, getAllUsers };
