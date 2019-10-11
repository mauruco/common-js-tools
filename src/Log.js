const fs = require('fs');

const home = __dirname.replace(/node_modules\/common-js-tools\/src/g, '');
let config = { deploy: 'production', stackSize: 100 };

class Log {
  constructor(title = 'NO LOG TITLE DEFINED') {
    this.title = title;
    this.stack = [];
    this.stackSize = config.stackSize;
    this.configDeploy = '';
    if (fs.existsSync(`${home}/common-js-tools.json`)) {
      try {
        const configJson = JSON.parse(fs.readFileSync(`${home}/common-js-tools.json`, 'utf8'));
        this.stackSize = configJson.stackSize ? configJson.stackSize : this.stackSize;
        this.configDeploy = configJson.deploy ? configJson.deploy : '';
        if (!this.configDeploy)
          this.configDeploy = process.env.NODE_ENV || process.env.ENVIRONMENT || process.env.environment;
      } catch (error) {
        console.log('Log.js failed to load settings');
        console.log(error);
      }
      return;
    }
    if (!this.configDeploy)
      this.configDeploy = process.env.NODE_ENV || process.env.ENVIRONMENT || process.env.environment || 'production';
    
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
    return true;
  }

  static getDate() {
    return new Date().toISOString().replace(/Z/g, '');
  }

  static beautify(args) {
    if (args.length && args.length > 1 || args[0] && !(args[0] instanceof Error)) return args;
    const stack = args[0].stack.split('\n');
    return `${args[0].message}\n${stack[0] || ''}${stack[1] || ''}`;
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
    log = log.concat(Log.beautify(args));
    console.log(...log);
  }

  trace(...args) {
    let log = this.create('trace');
    log = log.concat(Log.beautify(args));
    if (this.stack.length > this.stackSize) this.stack = [];
    if (Log.isDev(this)) {
      return console.log(...log);
    }
    return this.stack.push(log);
  }

  error(...args) {
    let log = this.create('error');
    log = log.concat(Log.beautify(args));
    this.stack.map((error) => {
      console.log(...error);
    });
    this.stack = [];
    console.log(...log);
  }
}

module.exports = Log;
