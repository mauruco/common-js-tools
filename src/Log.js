const fs = require('fs');

const home = __dirname.replace(/(node_modules\/common-js-tools)?\/src/g, '');
let config = { deploy: 'production', stackSize: 100 };

class Log {
  constructor(title = 'NO LOG TITLE DEFINED') {
    this.title = title;
    this.stack = [];
    this.stackSize = config.stackSize;
    this.configDeploy = 'undefined';
    if (fs.existsSync(`${home}/common-js-tools.json`)) {
      try {
        const configJson = JSON.parse(fs.readFileSync(`${home}/common-js-tools.json`, 'utf8'));
        this.stackSize = configJson.stackSize ? configJson.stackSize : this.stackSize;
        this.configDeploy = configJson.deploy ? configJson.deploy : false;
      } catch (error) {
        console.log('Log.js failed to load settings');
        console.log(error);
      }
    }
  }

  static sequelize(...args) {
    if (!Log.isDev({})) return;
    const reg = /^([^:]+:)(.*)/;
    const matchs = String(args[0] || '').match(reg);
    if (!matchs || !matchs.length) console.log(`\x1b[32m[SEQUELIZE]\x1b[0m ${Log.getDate()} \x1b[32m(SEQUELIZE) -> \x1b[0m\x1b[33m${args}\x1b[0m`);
    else console.log(`\x1b[32m[SEQUELIZE]\x1b[0m ${Log.getDate()} \x1b[32m(${matchs[1]}) -> \x1b[0m\x1b[33m${matchs[2]}\x1b[0m`);
  }

  static isDev(log) {
    if (log.configDeploy === 'production') return false;
    return (process.env.NODE_ENV === 'development' || log.configDeploy === 'development');
  }

  static getDate() {
    return new Date().toISOString().replace(/Z/g, '');
  }

  create(type) {
    const date = Log.getDate();
    let types = {
      log: `\x1b[32m[:LOG:]\x1b[0m ${date} \x1b[32m${this.title ? `(${this.title})` : ''} ->\x1b[0m`,
      trace: `\x1b[36m[TRACE]\x1b[0m ${date} \x1b[36m${this.title ? `(${this.title})` : ''} ->\x1b[0m`,
      error: `\x1b[31m[ERROR]\x1b[0m ${date} \x1b[31m${this.title ? `(${this.title})` : ''} ->\x1b[0m`,
    };

    if (!Log.isDev(this)) {
      types = {
        log: `[LOG] ${date} ${this.title ? `(${this.title})` : ''} ->`,
        trace: `[TRACE] ${date} ${this.title ? `(${this.title})` : ''} ->`,
        error: `[ERROR] ${date} ${this.title ? `(${this.title})` : ''} ->`,
      };
    }

    return [types[type]];
  }

  console(...args) {
    let log = this.create('log');
    log = log.concat(args);
    console.log(...log);
  }

  trace(...args) {
    let log = this.create('trace');
    log = log.concat(args);
    if (this.stack.length > this.stackSize) this.stack = [];
    if (Log.isDev(this)) {
      return console.log(...log);
    }
    return this.stack.push(log);
  }

  error(...args) {
    let log = this.create('error');
    log = log.concat(args);
    this.stack.map((error) => {
      console.log(...error);
    });
    this.stack = [];
    console.log(...log);
  }
}

module.exports = Log;
