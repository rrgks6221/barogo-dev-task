import request from 'supertest';
import app from '../src/app';

describe('cash (e2e)', () => {
  const server = request(app);

  describe('POST api/cash', () => {
    it('현금 투입', async () => {
      const response = await server
        .post('/api/cash')
        .set('Content-Type', 'application/json')
        .send({ cash: 500 });

      expect(response.statusCode).toBe(201);
    });
  });
});
