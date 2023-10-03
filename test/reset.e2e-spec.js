import request from 'supertest';
import app from '../src/app.js';

describe('reset, (e2e)', () => {
  let server;

  beforeEach(() => {
    server = request(app);
  });

  describe('POST api/reset', () => {
    it('response 204', async () => {
      const response = await server
        .post('/api/reset')
        .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(204);
    });
  });
});
