import request from 'supertest';
import app from '../src/app.js';

describe('reset, (e2e)', () => {
  let server;

  beforeEach(() => {
    server = request(app);
  });

  describe('POST api/payment-status', () => {
    it('response 200', async () => {
      const response = await server
        .get('/api/payment-status')
        .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
    });
  });
});
