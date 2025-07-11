
import { Router } from 'express';
import { subscribeToNewsletter, getAllSubscribers, checkNewsletterSubscription } from '../controllers/newsletterController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.post('/', subscribeToNewsletter);
router.get('/', protect, authorize('admin'), getAllSubscribers);
router.get('/check', checkNewsletterSubscription);

export default router;
