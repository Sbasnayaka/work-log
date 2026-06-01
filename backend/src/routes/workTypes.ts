import { Router } from 'express';
import * as controller from '../controllers/workTypeController';

const router = Router();
router.get('/', controller.getWorkTypes);

export default router;