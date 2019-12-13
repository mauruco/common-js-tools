/**
 * Recebe um array composto com os parametros e a função, executa um a um em um determiado timeout
 * Retorna um array com o resultados
 * @param {*} stack Um array com [ [ [param1, param2, ..], functionReferencia], [ [param1, param2, ..], functionReferencia] ];
 * @param {*} timeout timeout desejado em ms
 * *param resulStack o retorno, não passar nada
 * expl:
  const rand = () => Math.floor(Math.random() * (2000 - 500 + 1) + 500);
  // a função ou promessa a ser executa sinc
  const f = (a, b) => new Promise((resolve, reject) => {
    let time = rand();
    setTimeout(() => {
      if (time < 1000) return resolve(new Error(`test error${JSON.stringify([a, b, a + b])}`));
      return resolve([a, b, a + b]);
    }, time);
  });
  const stack = [
    [[1, 2], f], parametros que funçaõ recebe e a referencia a função
    [[2, 3], f],
    [[3, 4], f],
    [[4, 5], f],
    [[5, 6], f],
  ];
  let promises = await syncStack(stack, 1000);
  let result = await Promise.all(promises.map((p) => p.catch((e) => e)));
  conosole.log(result);
 */
// const syncStack = async (stack, timeout, resulStack) => {
//   let st = stack;
//   let rs = resulStack;
//   if (!resulStack) rs = [];
//   const execute = st.pop();
//   setTimeout(() => {
//     rs.push(execute[1](...execute[0]));
//     if (!st.length) return rs;
//     return syncStack(st, timeout, rs);
//   }, timeout);
// };
const syncStack = async (stack, timeout, resulStack) => new Promise((resolve) => {
  let st = stack;
  let rs = resulStack;
  if (!resulStack) rs = [];
  const execute = st.shift();
  setTimeout(async () => {
    let tryDo = null;
    try {
      tryDo = execute[1](...execute[0]);
    } catch (error) {
      tryDo = error;
    }
    rs.push(tryDo);
    if (!st.length) resolve(rs);
    let recursiv = await syncStack(st, timeout, rs);
    resolve(recursiv);
  }, timeout);
});

module.exports = syncStack;
