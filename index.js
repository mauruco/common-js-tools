const Log = require('./src/Log');

const round = (n, d) => Number(`${Math.round(`${n}e${d || 2}`)}e-${d || 2}`);

module.exports = {
  Log,
  round,
};
