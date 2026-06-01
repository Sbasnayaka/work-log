import { Router } from 'express';
import * as controller from '../controllers/workEntryController';

const router = Router();
router.get('/', controller.getEntries);
router.post('/', controller.postEntry);
router.delete('/:id', controller.deleteEntry);
router.put('/:id', controller.putEntry);

export default router;