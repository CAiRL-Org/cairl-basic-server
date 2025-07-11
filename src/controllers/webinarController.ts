import { Request, Response } from 'express';
import { WebinarService } from '../services/webinarService';
import asyncHandler from '../utils/asyncHandler';

const webinarService = new WebinarService();

export const createWebinar = asyncHandler(async (req: Request, res: Response) => {
  const webinar = await webinarService.createWebinar(req.body);
  res.status(201).json(webinar);
});

export const getWebinars = asyncHandler(async (req: Request, res: Response) => {
  const webinars = await webinarService.getWebinars();
  res.status(200).json(webinars);
});

export const getWebinarById = asyncHandler(async (req: Request, res: Response) => {
  const webinar = await webinarService.getWebinarById(req.params.id);
  if (!webinar) {
    res.status(404).json({ message: 'Webinar not found' });
    return;
  }
  res.status(200).json(webinar);
});

export const updateWebinar = asyncHandler(async (req: Request, res: Response) => {
  const webinar = await webinarService.updateWebinar(req.params.id, req.body);
  if (!webinar) {
    res.status(404).json({ message: 'Webinar not found' });
    return;
  }
  res.status(200).json(webinar);
});

export const deleteWebinar = asyncHandler(async (req: Request, res: Response) => {
  const webinar = await webinarService.deleteWebinar(req.params.id);
  if (!webinar) {
    res.status(404).json({ message: 'Webinar not found' });
    return;
  }
  res.status(200).json({ message: 'Webinar deleted successfully' });
});
