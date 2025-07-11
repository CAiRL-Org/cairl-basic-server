import express from 'express';
import { getUpcomingWebinars, newUpcomingWebinar, getUpcomingWebinar, updateWebinar, deleteWebinar } from '../controllers/upcomingWebinarController';

const router = express.Router();

router.route('/').get(getUpcomingWebinars).post(newUpcomingWebinar);
router.route('/:id').get(getUpcomingWebinar).put(updateWebinar).delete(deleteWebinar);

export default router;
