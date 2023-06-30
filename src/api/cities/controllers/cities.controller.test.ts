import request from 'supertest';
import httpStatus from 'http-status';
import { Response } from 'express';
import { CitiesCtrl } from './cities.controller';
import { CITIES_PATH } from '@utils/common.utils';
import { City } from '@api/cities/models/City.model';

const app = require('@root/app');

describe('CitiesCtrl', () => {
  let mockResponse: Partial<Response>;
  const citiesCtrl = new CitiesCtrl();

  beforeEach(() => {
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

    it('GET /cities', async () => {
      const CITIES = require(CITIES_PATH).map(({ name }, index) => ({ id: index+1, name }));
      const response = await request(app).get('/cities').expect(httpStatus.OK);

      // Verify the response
        expect(response.body.data.result).toEqual(CITIES);
    });

    it('should return valid structure', async () => {
      
      const cities = [
        { id: 1, name: 'City A' },
        { id: 2, name: 'City B' },
        { id: 3, name: 'City C' },
      ] as City[];

      jest.spyOn(City, 'findAll').mockResolvedValue(cities);

      await citiesCtrl.getCities({}, mockResponse as Response);

      expect(City.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: {
          result: cities,
          message: 'Success'
        },
        status: 200,
      });
    });
});
