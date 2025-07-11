import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getAllUpcomingWebinars as getAllUpcomingWebinarsService,
  createUpcomingWebinar as createUpcomingWebinarService,
  getUpcomingWebinarById as getUpcomingWebinarByIdService,
  updateUpcomingWebinar as updateUpcomingWebinarService,
  deleteUpcomingWebinar as deleteUpcomingWebinarService,
} from '../services/upcomingWebinarService';

// @desc    Get all upcoming webinars
// @route   GET /api/upcoming-webinars
// @access  Public
const getUpcomingWebinars = asyncHandler(async (req: Request, res: Response) => {
  const upcomingWebinars = await getAllUpcomingWebinarsService();
  res.json(upcomingWebinars);
});

// @desc    Create a new upcoming webinar
// @route   POST /api/upcoming-webinars
// @access  Public
const createUpcomingWebinar = asyncHandler(async (req: Request, res: Response) => {
  const upcomingWebinar = await createUpcomingWebinarService(req.body);
  res.status(201).json(upcomingWebinar);
});

// @desc    Get an upcoming webinar by ID
// @route   GET /api/upcoming-webinars/:id
// @access  Public
const getUpcomingWebinar = asyncHandler(async (req: Request, res: Response) => {
  const upcomingWebinar = await getUpcomingWebinarByIdService(req.params.id);
  if (upcomingWebinar) {
    res.json(upcomingWebinar);
  } else {
    res.status(404);
    throw new Error('Upcoming webinar not found');
  }
});

// @desc    Update an upcoming webinar
// @route   PUT /api/upcoming-webinars/:id
// @access  Public
const updateUpcomingWebinar = asyncHandler(async (req: Request, res: Response) => {
  const upcomingWebinar = await updateUpcomingWebinarService(req.params.id, req.body);
  if (upcomingWebinar) {
    res.json(upcomingWebinar);
  } else {
    res.status(404);
    throw new Error('Upcoming webinar not found');
  }
});

// @desc    Delete an upcoming webinar
// @route   DELETE /api/upcoming-webinars/:id
// @access  Public
const deleteUpcomingWebinar = asyncHandler(async (req: Request, res: Response) => {
  const upcomingWebinar = await deleteUpcomingWebinarService(req.params.id);
  if (upcomingWebinar) {
    res.json({ message: 'Upcoming webinar removed' });
  } else {
    res.status(404);
    throw new Error('Upcoming webinar not found');
  }
});

export { getUpcomingWebinars, createUpcomingWebinar, getUpcomingWebinar, updateUpcomingWebinar, deleteUpcomingWebinar };
