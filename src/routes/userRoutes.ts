import express from 'express';
import { authUser, registerUser, getUsers } from '../controllers/userController';
import { protect, authorize } from '../middleware/authMiddleware';
import { validateRegistration, validateLogin } from '../middleware/validationMiddleware';

const router = express.Router();

router.post('/login', validateLogin, authUser);
router.route('/').post(validateRegistration, registerUser).get(protect, authorize('admin'), getUsers);

export default router;
