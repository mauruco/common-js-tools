const https = require('https');

class Log {
  constructor(title = 'NO LOG TITLE DEFINED', config) {
    this.title = title;
    this.stack = [];
    this.splunkStack = [];
    this.stackSize = config && config.stackSize ? config.stackSize : 100;
    this.errorLevel = config && config.errorLevel ? config.errorLevel : 'production';
    this.splunk = config && config.splunk && config.splunk.enabled ? config.splunk : false;
    if (this.splunk && (!config.splunk.url || !config.splunk.token)) throw new Error('Log, Splunk -> Malformed for splunk Settings');
    if (this.splunk && (!config.splunk.url || !config.splunk.token)) throw new Error('Log,logSettings');
    if (process.env.NODE_ENV) this.errorLevel = process.env.NODE_ENV;
  }

  static logSequelize(config) {
    return (...args) => {
      if (config.errorLevel !== 'development') return;
      const reg = /^([^:]+:)(.*)/;
      const matchs = String(args[0] || '').match(reg);
      if (!matchs || !matchs.length) console.log(`\x1b[32m[SEQUELIZE]\x1b[0m ${Log.getDate()} \x1b[32m(SEQUELIZE) -> \x1b[0m\x1b[33m${args}\x1b[0m`);
      else console.log(`\x1b[32m[SEQUELIZE]\x1b[0m ${Log.getDate()} \x1b[32m(${matchs[1]}) -> \x1b[0m\x1b[33m${matchs[2]}\x1b[0m`);
    };
  }

  static isDev(log) {
    if (log.errorLevel === 'production') return false;
    return true;
  }

  static getDate() {
    return new Date().toISOString().replace(/Z/g, '');
  }

  static beautify(args) {
    if (args.length && args.length > 1 || args[0] && !(args[0] instanceof Error) || !args[0].stack) return args;
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
        log: `[:LOG:] ${date} ${this.title ? `(${this.title})` : ''} ->`,
        trace: `[TRACE] ${date} ${this.title ? `(${this.title})` : ''} ->`,
        error: `[ERROR] ${date} ${this.title ? `(${this.title})` : ''} ->`,
      };
    }

    return [types[type]];
  }

  console(...args) {
    let log = this.create('log');
    log = log.concat(Log.beautify(args));
    if (this.errorLevel !== 'onlySplunk') console.log(...log);
    if ((this.errorLevel === 'production' || this.errorLevel === 'onlySplunk') && this.splunk && this.splunk.enabled) {
      this.send([{ type: ':LOG:', args }]);
    }
  }

  trace(...args) {
    let log = this.create('trace');
    log = log.concat(Log.beautify(args));
    if (this.stack.length > this.stackSize) {
      this.stack = [];
      this.splunkStack = [];
    }
    if ((this.errorLevel === 'production' || this.errorLevel === 'onlySplunk') && this.splunk && this.splunk.enabled) {
      this.splunkStack.push({ type: 'TRACE', args });
    }
    if (Log.isDev(this) && this.errorLevel !== 'onlySplunk') {
      return console.log(...log);
    }
    return this.stack.push(log);
  }

  error(...args) {
    let log = this.create('error');
    log = log.concat(Log.beautify(args));
    this.stack.push(log);
    if ((this.errorLevel === 'production' || this.errorLevel === 'onlySplunk') && this.splunk && this.splunk.enabled) {
      this.splunkStack.push({ type: 'ERROR', args });
    }
    this.stack.map((error) => {
      if (this.errorLevel !== 'onlySplunk') console.log(...error);
      return error;
    });
    this.stack = [];
    if ((this.errorLevel === 'production' || this.errorLevel === 'onlySplunk') && this.splunk && this.splunk.enabled) {
      this.send(this.splunkStack, this);
    }
  }

  send(stack, self) {
    let options = {
      hostname: this.splunk.url,
      port: 443,
      path: '/services/collector/event/1.0',
      method: 'POST',
      headers: {
        Authorization: `Splunk ${this.splunk.token}`,
        'Content-Type': 'application/raw',
        'Content-Length': 0,
      },
    };
    let content = '';
    stack.map((log) => {
      log.args.map((arg) => {
        let str = arg.message || arg;
        if (typeof str !== 'string') {
          try {
            JSON.stringify(arg);
          } catch (e) {
            console.log('Content malformed for splunk');
            console.log(arg);
          }
          return arg;
        }
        content += JSON.stringify({
          source: this.title,
          sourcetype: 'httpevent',
          time: Date.now(),
          event: {
            message: str,
            type: log.type,
            severity: 'info',
          },
        });
      });
      return log;
    });
    options.headers['Content-Length'] = content.length;
    let req = https.request(options, (res) => {
      res.on('data', (data) => {
        if (self) self.splunkStack = [];
        try {
          let result = JSON.parse(Buffer.from(data).toString());
          if (result.text !== 'Success') {
            console.log('Splunk, response is not Success');
            console.log(data);
            console.log('#Content#');
            console.log(content);
          }
        } catch (e) {
          console.log(e);
          console.log('#Content#');
          console.log(content);
        }
      });
    });

    req.on('error', (e) => {
      console.log('Splunk, not responding');
      console.log(e);
      console.log('#Content#');
      console.log(content);
      if (self) self.splunkStack = [];
    });
    req.write(content);
    req.end();
  }
}

module.exports = Log;
