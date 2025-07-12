
import { Router } from 'express';
import { subscribeToNewsletter, getAllSubscribers, checkNewsletterSubscription } from '../controllers/newsletterController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Newsletter
 *   description: Newsletter subscription management
 */

/**
 * @swagger
 * /api/newsletter:
 *   post:
 *     summary: Subscribe to the newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: Subscribed successfully
 *       400:
 *         description: Already subscribed
 *   get:
 *     summary: Get all newsletter subscribers
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of subscribers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsletterSubscription'
 */

/**
 * @swagger
 * /api/newsletter/check:
 *   get:
 *     summary: Check if an email is subscribed to the newsletter
 *     tags: [Newsletter]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         required: true
 *         description: The email to check
 *     responses:
 *       200:
 *         description: Subscription status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSubscribed:
 *                   type: boolean
 */

router.post('/', subscribeToNewsletter);
router.get('/', protect, authorize('admin'), getAllSubscribers);
router.get('/check', checkNewsletterSubscription);


export default router;
