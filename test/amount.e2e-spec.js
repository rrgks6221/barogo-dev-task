import request from 'supertest';
import app from '../src/app.js';

describe('reset, (e2e)', () => {
  let server;

  beforeEach(async () => {
    server = request(app);

    await server.post('/api/reset').set('Content-Type', 'application/json');
  });

  describe('POST api/amount', () => {
    it('현금일 경우', async () => {
      await server
        .post('/api/cash')
        .set('Content-Type', 'application/json')
        .send({ cash: 500 });

      const response = await server
        .get('/api/amount')
        .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.text)).toEqual({
        currentAmount: 500,
      });
    });

    it('카드일 경우', async () => {
      await server
        .get('/api/cards/3112')
        .set('Content-Type', 'application/json');

      const response = await server
        .get('/api/amount')
        .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.text)).toEqual({
        currentAmount: expect.anything(),
      });
    });

    it('대기일 경우', async () => {
      const response = await server
        .get('/api/amount')
        .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.text)).toEqual({
        currentAmount: 0,
      });
    });
  });
});
