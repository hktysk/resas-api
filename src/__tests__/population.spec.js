require('dotenv').config({
  path: '../.env'
});
const req = require('supertest');
const server = require('../server');
const netlifyFunctionsPath = require('../lib/netlifyFunctionsPath');

describe('/population', () => {
  it('正常に人口のデータを取得できるか', () => {
    req(server)
      .get(`${netlifyFunctionsPath}/population/3`)
      .then(res => {
        expect(res.statusCode).toBe(200);
      })
  });

  it('人口データを取得できなかった場合は400を返すか', () => {
    req(server)
      .get(`${netlifyFunctionsPath}/population/1000`)
      .then(res => {
        expect(res.statusCode).toBe(400);
      })
  })
})
