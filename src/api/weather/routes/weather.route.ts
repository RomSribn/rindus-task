import { Router } from 'express';
import { WeatherCtrl } from '../controllers/weather.controller';

const router = Router();
const weatherCtrl = new WeatherCtrl();

router.route('/').get(weatherCtrl.getWeather);
router.route('/:cityId').get(weatherCtrl.getWeatherByCityId);

export default router;
