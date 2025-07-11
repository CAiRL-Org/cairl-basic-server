
import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { NewsletterService } from '../services/newsletterService';

const newsletterService = new NewsletterService();

export const subscribeToNewsletter = asyncHandler(async (req: Request, res: Response) => {
  const { email, firstName, lastName, gender, occupation, org, country, interests } = req.body;
  const result = await newsletterService.subscribe(email, firstName, lastName, gender, occupation, org, country, interests);
  res.status(201).json(result);
});

export const getAllSubscribers = asyncHandler(async (req: Request, res: Response) => {
  const subscribers = await newsletterService.getAllSubscribers();
  res.status(200).json(subscribers);
});

export const checkNewsletterSubscription = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.query;
  const isSubscribed = await newsletterService.checkSubscription(email as string);
  res.status(200).json({ isSubscribed });
});
