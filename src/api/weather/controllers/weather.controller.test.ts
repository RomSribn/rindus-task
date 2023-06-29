import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { WeatherCtrl } from './weather.controller';
import { getWeatherData } from '../services/getWeatherData.service';

jest.mock('../services/getWeatherData.service'); // Mocking the getWeatherData service

describe('WeatherCtrl', () => {
  let weatherCtrl: WeatherCtrl;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    weatherCtrl = new WeatherCtrl();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getWeather', () => {
    it('should return weather data successfully', async () => {
      const mockResult = [
        { name: 'City 1', averageTmp: 20, weather: [] },
        { name: 'City 2', averageTmp: 18, weather: [] },
      ];

      (getWeatherData as jest.Mock).mockResolvedValue(mockResult);

      await weatherCtrl.getWeather(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: {
          result: mockResult,
          message: 'Success',
        },
        status: 200,
      });
    });

  });

  describe('getWeatherByCityId', () => {
    it('should return weather data for a valid cityId', async () => {
      const mockCityId = '123';
      const mockResult = [
        { name: 'City 1', averageTmp: 20, weather: [] },
        { name: 'City 2', averageTmp: 18, weather: [] },
      ];
      (getWeatherData as jest.Mock).mockResolvedValue(mockResult);

      mockRequest.params = { cityId: mockCityId };

      await weatherCtrl.getWeatherByCityId(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: {
          result: mockResult,
          message: 'Success',
        },
        status: 200,
      });
    });
  });
});
