require('dotenv').config({
  path: '../.env'
});
const req = require('supertest');
const server = require('../server');
const netlifyFunctionsPath = require('../lib/netlifyFunctionsPath');

describe('/prefectures', () => {
  it('正常に県名のデータを取得できるか', () => {
    req(server)
      .get(`${netlifyFunctionsPath}/prefectures`)
      .then(res => {
        expect(res.statusCode).toBe(200);
      })
  });
})
