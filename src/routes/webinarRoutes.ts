import { Router } from 'express';
import {
  createWebinar,
  getWebinars,
  getWebinarById,
  updateWebinar,
  deleteWebinar,
} from '../controllers/webinarController';

const router = Router();

router.post('/', createWebinar);
router.get('/', getWebinars);
router.get('/:id', getWebinarById);
router.put('/:id', updateWebinar);
router.delete('/:id', deleteWebinar);

export default router;
