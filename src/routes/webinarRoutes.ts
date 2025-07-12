import { Router } from 'express';
import {
  createWebinar,
  getWebinars,
  getWebinarById,
  updateWebinar,
  deleteWebinar,
} from '../controllers/webinarController';

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Webinars
 *   description: Webinar management
 */

/**
 * @swagger
 * /api/webinars:
 *   post:
 *     summary: Create a new webinar
 *     tags: [Webinars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Webinar'
 *     responses:
 *       201:
 *         description: The created webinar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Webinar'
 *   get:
 *     summary: Get all webinars
 *     tags: [Webinars]
 *     responses:
 *       200:
 *         description: A list of webinars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Webinar'
 */

/**
 * @swagger
 * /api/webinars/{id}:
 *   get:
 *     summary: Get a webinar by ID
 *     tags: [Webinars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The webinar ID
 *     responses:
 *       200:
 *         description: The webinar description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Webinar'
 *       404:
 *         description: The webinar was not found
 *   put:
 *     summary: Update a webinar
 *     tags: [Webinars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The webinar ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Webinar'
 *     responses:
 *       200:
 *         description: The updated webinar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Webinar'
 *       404:
 *         description: The webinar was not found
 *   delete:
 *     summary: Delete a webinar
 *     tags: [Webinars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The webinar ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: The webinar was not found
 */

router.post('/', createWebinar);
router.get('/', getWebinars);
router.get('/:id', getWebinarById);
router.put('/:id', updateWebinar);
router.delete('/:id', deleteWebinar);


export default router;
