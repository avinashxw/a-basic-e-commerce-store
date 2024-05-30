const request = require('supertest');
const app = require('../app');

describe('Online E-Commerce Store', () => {
  it('should add an item to the cart', async () => {
    const response = await request(app)
      .post('/cart/add')
      .send({ userid: '1', item: { itemId: 'Soap', quantity: 10, price: 150 } });
    expect(response.statusCode).toBe(200);
  });

  it('should checkout the cart', async () => {
    await request(app)
      .post('/cart/add')
      .send({ userid: '1', item: { itemId: 'Soap', quantity: 10, price: 150 } });

    const response = await request(app)
      .post('/cart/checkout')
      .send({ userid: '1', discountCode: '' });
    expect(response.statusCode).toBe(200);
  });

  it('should generate a discount code', async () => {
    const response = await request(app)
      .post('/admin/generatecoupon');
    expect(response.statusCode).toBe(200);
  });
});
