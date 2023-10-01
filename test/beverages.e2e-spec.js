import request from 'supertest';
import app from '../src/app';

describe('beverages (e2e)', () => {
  const server = request(app);

  describe('GET api/beverages', () => {
    it('모든 beverage 조회', async () => {
      const response = await server
        .get('/api/beverages')
        .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET api/beverages/:id', () => {
    it('단일 beverage 조회', async () => {
      const response = await server
        .get('/api/beverages/1')
        .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
    });

    it('존재하지 않는 beverage 조회', async () => {
      const response = await server
        .get('/api/beverages/1000000000')
        .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(404);
    });
  });
});
