import { Router } from 'express';
import { _InitCtrl } from './ctrl';

const router = Router();
const _appCtrl = new _InitCtrl();

router.route('/').post(_appCtrl.runAppInit);

export default router;
