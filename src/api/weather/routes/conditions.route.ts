import { Router } from 'express';
import { ConditionsCtrl } from '../controllers/conditions.controller';

const router = Router();
const conditionsCtrl = new ConditionsCtrl();

router.route('/').get(conditionsCtrl.getConditions);

export default router;
