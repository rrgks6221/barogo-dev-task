import request from 'supertest';
import app from '../src/app';

describe('cash (e2e)', () => {
  let server;

  beforeEach(() => {
    server = request(app);
  });

  describe('GET api/cash', () => {
    it('현금 반환', async () => {
      await server
        .post('/api/cash')
        .set('Content-Type', 'application/json')
        .send({ cash: 10500 });

      const response = await server
        .get('/api/cash')
        .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.text)).toEqual({
        returnAmount: { 100: 0, 500: 0, 1000: 0, 5000: 0, 10000: 0 },
      });
    });
  });

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
