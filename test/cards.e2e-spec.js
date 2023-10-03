import request from 'supertest';
import app from '../src/app';

describe('cards (e2e)', () => {
  let server;

  beforeEach(() => {
    server = request(app);
  });

  describe('GET api/cards/:id', () => {
    it('카드 조회', async () => {
      const response = await server
        .get('/api/cards/3112')
        .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.text)).toMatchObject({
        amount: expect.anything(),
      });
    });
  });
});
