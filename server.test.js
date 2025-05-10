// server.test.js
const request = require('supertest');
const app = require('./server');
const dogFacts = require('./dog_facts-1');

describe('Dog Facts API', () => {
  
  // Normal

  describe('Normal cases', () => {
    test('GET /facts -> all facts with success=true', async () => {
      const res = await request(app).get('/facts');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.facts)).toBe(true);
      expect(res.body.facts.length).toBe(dogFacts.length);
      expect(res.body.facts).toEqual(dogFacts);
    });

    test('GET /facts?number=3 -> first 3 facts', async () => {
      const res = await request(app).get('/facts?number=3');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.facts).toEqual(dogFacts.slice(0, 3));
    });

    test('GET /facts?number=total -> all facts', async () => {
      const total = dogFacts.length;
      const res = await request(app).get(`/facts?number=${total}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.facts).toEqual(dogFacts);
    });

    test('GET /facts?number>total -> all facts', async () => {
      const res = await request(app).get(`/facts?number=${dogFacts.length + 5}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.facts).toEqual(dogFacts);
    });
  });

  // Edge cases

  describe('Edge cases', () => {
    test('GET /facts?number=0 -> 400 Invalid number parameter', async () => {
      const res = await request(app).get('/facts?number=0');
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Invalid number parameter');
    });

    test('GET /facts?number=-5 -> 400 Invalid number parameter', async () => {
      const res = await request(app).get('/facts?number=-5');
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Invalid number parameter');
    });

    test('GET /facts?number=foo -> 400 Invalid number parameter', async () => {
      const res = await request(app).get('/facts?number=foo');
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Invalid number parameter');
    });
  });

  test('GET /does-not-exist -> 404 Endpoint not found', async () => {
    const res = await request(app).get('/does-not-exist');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('Endpoint not found');
  });
});
