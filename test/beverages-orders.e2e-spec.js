import request from 'supertest';
import app from '../src/app.js';

describe('beverages/:id/orders (e2e)', () => {
  let server;

  beforeEach(() => {
    server = request(app);
  });

  describe('POST api/beverages/:id/orders', () => {
    describe('결제 대기인 경우', () => {
      it('결제 대기인 경우 주문이 불가능하다.', async () => {
        const response = await server
          .post('/api/beverages/1/orders')
          .set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(400);
      });
    });

    describe('현금 결제인 경우', () => {
      it('금액이 부족한 경우', async () => {
        await server
          .post('/api/cash')
          .set('Content-Type', 'application/json')
          .send({ cash: 300 });

        const response = await server
          .post('/api/beverages/1/orders')
          .set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(400);
      });

      it('주문 성공', async () => {
        await server
          .post('/api/cash')
          .set('Content-Type', 'application/json')
          .send({ cash: 10000 });

        const response = await server
          .post('/api/beverages/1/orders')
          .set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(204);
      });
    });

    /**
     * @todo
     */
    describe.skip('카드 결제인 경우', () => {});
  });
});
