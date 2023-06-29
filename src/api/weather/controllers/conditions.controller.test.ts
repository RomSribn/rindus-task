import supertest from 'supertest';
import { app } from '../../../app';
import { CONDITIONS_PATH } from '@utils/common.utils';

describe('ConditionsCtrl', () => {
  const request = supertest(app);
  let server: any;
  beforeAll(done => {
    server = app.listen(4000, done);
  });

  afterAll(done => {
    server.close(done);
  });
  it('should return all conditions', async () => {
    const CONDITIONS = require(CONDITIONS_PATH).map(({ name }, index) => ({ id: index + 1, name }));
    const response = await request.get('/conditions').expect(200);

    // Verify the response
    expect(response.body.data.result).toEqual(CONDITIONS);
  });
});
