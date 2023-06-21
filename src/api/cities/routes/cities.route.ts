import { Router } from 'express';
import { CitiesCtrl } from '../controllers/cities.controller';

const router = Router();
const citiesCtrl = new CitiesCtrl();

router.route('/').get(citiesCtrl.getCities);

export default router;
