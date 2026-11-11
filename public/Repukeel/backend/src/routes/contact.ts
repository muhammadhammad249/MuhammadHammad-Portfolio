import { Router } from 'express';
import { submitContactInquiry } from '../controllers/contactController';

const router = Router();

// POST /api/v1/contact
router.post('/', submitContactInquiry);

export default router;
