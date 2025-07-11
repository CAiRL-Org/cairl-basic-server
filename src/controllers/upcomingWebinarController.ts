import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getAllUpcomingWebinars,
  createUpcomingWebinar,
  getUpcomingWebinarById,
  updateUpcomingWebinar,
  deleteUpcomingWebinar,
} from '../services/upcomingWebinarService';

// @desc    Get all upcoming webinars
// @route   GET /api/upcoming-webinars
// @access  Public
const getUpcomingWebinars = asyncHandler(async (req: Request, res: Response) => {
  const upcomingWebinars = await getAllUpcomingWebinars();
  res.json(upcomingWebinars);
});

// @desc    Create a new upcoming webinar
// @route   POST /api/upcoming-webinars
// @access  Public
const newUpcomingWebinar = asyncHandler(async (req: Request, res: Response) => {
  const upcomingWebinar = await createUpcomingWebinar(req.body);
  res.status(201).json(upcomingWebinar);
});

// @desc    Get an upcoming webinar by ID
// @route   GET /api/upcoming-webinars/:id
// @access  Public
const getUpcomingWebinar = asyncHandler(async (req: Request, res: Response) => {
  const upcomingWebinar = await getUpcomingWebinarById(req.params.id);
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
const updateWebinar = asyncHandler(async (req: Request, res: Response) => {
  const upcomingWebinar = await updateUpcomingWebinar(req.params.id, req.body);
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
const deleteWebinar = asyncHandler(async (req: Request, res: Response) => {
  const upcomingWebinar = await deleteUpcomingWebinar(req.params.id);
  if (upcomingWebinar) {
    res.json({ message: 'Upcoming webinar removed' });
  } else {
    res.status(404);
    throw new Error('Upcoming webinar not found');
  }
});

export { getUpcomingWebinars, newUpcomingWebinar, getUpcomingWebinar, updateWebinar, deleteWebinar };
