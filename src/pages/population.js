'use strict'
const fetch = require('node-fetch');
const authHeader = require('../lib/authHeader');

// prefCode から人口を取得し, 総人口を出力
module.exports = async function(req, res) {
  const API = process.env.API + '/v1/population/composition/perYear?prefCode=' + req.params.prefCode;
  const headers = authHeader;

  const population = await fetch(API, { headers })
    .then(r => {
      if (!r.ok) throw new Error();

      return r.json();
    }).catch(e => console.log(e))

  if (!population.result) {
    return res.status(400).send({
      statusCode: '400',
      message: 'Can not get population from RESAS API'
    })
  }

  // result 内の data の中に総人口, 年少人口, 生産年齢人口, 老年人口が格納されてある
  const totalPopulation = population.result.data.find(d => d.label === '総人口');

  // 未来の予測も含まれているので, 今年までを抽出
  const thisYear = new Date().getFullYear();
  const dataUpToThisYear = totalPopulation.data.filter(d => d.year <= thisYear);

  res.json(dataUpToThisYear);
}
