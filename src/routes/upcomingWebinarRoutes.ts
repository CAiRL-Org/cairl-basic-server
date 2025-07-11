import express from 'express';
import { getUpcomingWebinars, createUpcomingWebinar, getUpcomingWebinar, updateUpcomingWebinar, deleteUpcomingWebinar } from '../controllers/upcomingWebinarController';

const router = express.Router();

router.route('/').get(getUpcomingWebinars).post(createUpcomingWebinar);
router.route('/:id').get(getUpcomingWebinar).put(updateUpcomingWebinar).delete(deleteUpcomingWebinar);

export default router;
