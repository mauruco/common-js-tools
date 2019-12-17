const Log = require('./src/Log');
const Holidays = require('./src/Holidays');
const request = require('./src/request');
const syncStack = require('./src/syncStack');

// Problemas conhecidos com js
/*
  Arredondamento de flot após multiplicação ou divisão
  console.log(200.30 * 3);        ERRADO  600.9000000000001
  console.log(round(200.30 * 3)); CORRETO 600.9
  console.log(200.30 / 3);        ERRADO  66.76666666666667
  console.log(round(200.30 / 3)); CORRETO  66.77
*/
const round = (n, d) => Number(`${Math.round(`${n}e${d || 2}`)}e-${d || 2}`);
/*
  Arredondamento no JSON parse de um número muito grande (Cuidado com  libs tipo axios, use minha request função)
  let jsonString = '{"value":9999999991234567}';
  console.log(JSON.parse(jsonString));                                            // ERRADO  { value: 9999999991234568 }
  console.log(JSON.parse(jsonString.replace(/:([\d]+)([,|}|\s]+)/g, ':"$1"$2'))); // CORRETO { value: '9999999991234567' }
*/
//


module.exports = {
  Log,
  Holidays,
  request,
  syncStack,
  round,
};
