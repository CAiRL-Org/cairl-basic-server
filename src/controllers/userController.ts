import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticateUser, registerNewUser, getAllUsers } from '../services/userService';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const authResponse = await authenticateUser(email, password);

  if (authResponse) {
    res.json(authResponse);
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const authResponse = await registerNewUser(username, email, password);

  if (authResponse) {
    res.status(201).json(authResponse);
  } else {
    res.status(400);
    throw new Error('User already exists or invalid user data');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
});

// @desc    Subscribe/Unsubscribe to newsletter
// @route   PUT /api/users/newsletter
// @access  Private
export { authUser, registerUser, getUsers };