'use strict'
const fetch = require('node-fetch');
const authHeader = require('../lib/authHeader');

// RESAS から都道府県を取得して出力
module.exports = async function(_, res) {
  const API = process.env.API + '/v1/prefectures';
  const headers = authHeader;

  const prefectures = await fetch(API, { headers })
    .then(r => {
      if (!r.ok) throw new Error();

      return r.json();
    }).catch(e => console.log(e))

  if (!prefectures) {
    return res.status(400).send({
      statusCode: '400',
      message: 'Can not get prefectures from RESAS API'
    })
  }

  // result に各県の prefCode と県名が格納されている
  res.json(prefectures.result)
}
