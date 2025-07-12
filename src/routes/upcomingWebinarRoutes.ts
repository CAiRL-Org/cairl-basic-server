import express from 'express';
import { getUpcomingWebinars, createUpcomingWebinar, getUpcomingWebinar, updateUpcomingWebinar, deleteUpcomingWebinar } from '../controllers/upcomingWebinarController';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Upcoming Webinars
 *   description: Upcoming webinar management
 */

/**
 * @swagger
 * /api/upcoming-webinars:
 *   get:
 *     summary: Get all upcoming webinars
 *     tags: [Upcoming Webinars]
 *     responses:
 *       200:
 *         description: A list of upcoming webinars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UpcomingWebinar'
 *   post:
 *     summary: Create a new upcoming webinar
 *     tags: [Upcoming Webinars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpcomingWebinar'
 *     responses:
 *       201:
 *         description: The created upcoming webinar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpcomingWebinar'
 */

/**
 * @swagger
 * /api/upcoming-webinars/{id}:
 *   get:
 *     summary: Get an upcoming webinar by ID
 *     tags: [Upcoming Webinars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The upcoming webinar ID
 *     responses:
 *       200:
 *         description: The upcoming webinar description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpcomingWebinar'
 *       404:
 *         description: The upcoming webinar was not found
 *   put:
 *     summary: Update an upcoming webinar
 *     tags: [Upcoming Webinars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The upcoming webinar ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpcomingWebinar'
 *     responses:
 *       200:
 *         description: The updated upcoming webinar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpcomingWebinar'
 *       404:
 *         description: The upcoming webinar was not found
 *   delete:
 *     summary: Delete an upcoming webinar
 *     tags: [Upcoming Webinars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The upcoming webinar ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: The upcoming webinar was not found
 */

router.route('/').get(getUpcomingWebinars).post(createUpcomingWebinar);
router.route('/:id').get(getUpcomingWebinar).put(updateUpcomingWebinar).delete(deleteUpcomingWebinar);


export default router;
