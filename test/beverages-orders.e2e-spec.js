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
     * @todo reset api 만든 후 작성
     */
    describe('카드 결제인 경우', () => {
      it('잔액 부족으로 카드결제 실패', async () => {
        const beverageResponse = await server
          .get('/api/beverages/1')
          .set('Content-Type', 'application/json');

        const beverage = JSON.parse(beverageResponse.text);

        let cardAmount = Infinity;

        while (1) {
          await server
            .post('/api/reset')
            .set('Content-Type', 'application/json');

          const cardInfoResponse = await server
            .get('/api/cards/123')
            .set('Content-Type', 'application/json');

          cardAmount = JSON.parse(cardInfoResponse.text).amount;

          if (cardAmount < beverage.price) {
            break;
          }
        }

        const response = await server
          .post('/api/beverages/1/orders')
          .set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(400);
      });

      it('카드 결제 성공', async () => {
        const beverageResponse = await server
          .get('/api/beverages/1')
          .set('Content-Type', 'application/json');

        const beverage = JSON.parse(beverageResponse.text);

        let cardAmount = 0;

        while (1) {
          await server
            .post('/api/reset')
            .set('Content-Type', 'application/json');

          const cardInfoResponse = await server
            .get('/api/cards/123')
            .set('Content-Type', 'application/json');

          cardAmount = JSON.parse(cardInfoResponse.text).amount;

          if (cardAmount >= beverage.price) {
            break;
          }
        }

        const response = await server
          .post('/api/beverages/1/orders')
          .set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(204);
      });
    });
  });
});
