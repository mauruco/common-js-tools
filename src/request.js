const https = require('https');
const http = require('http');
const qs = require('querystring');

module.exports = (type, options, postData) => new Promise((resolve, reject) => {

  const httpOrHttps = type === 'http' ? http : https;
  
  const req = httpOrHttps.request(options, (res) => {
    res.setEncoding('utf8');
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      const statusCode = parseInt(res.statusCode, 10);
      if (
        statusCode !== 200
        && statusCode !== 201
        && statusCode !== 202
        && statusCode !== 203
        && statusCode !== 204
        && statusCode !== 205
      ) return resolve({ statusCode, body });

      if (!body) return resolve({ statusCode, body });
      if (!JSON.stringify(res.headers).match(/content-type"\s?:\s?"application\/json/gi)) return resolve({ statusCode, body });
      try {
        const result = body.replace(/:([\d]{13,})([,|}|\s]+)/g, ':"$1"$2');
        return resolve({ statusCode, body: JSON.parse(result) });
      } catch (error) {
        return resolve({ statusCode, body });
      }
    });
  });

  req.on('error', (e) => reject(e));
  if (postData && (options.method === 'POST' || options.method === 'PUT')) {
    const headersType = JSON.stringify(options.headers);
    if (headersType.match(/content-type"\s?:\s?"application\/json/gi)){
      req.write(JSON.stringify(postData));
    } else if (headersType.match(/content-type"\s?:\s?"application\/x-www-form-urlencoded/gi)) {
      req.write(qs.stringify(postData));
    } else {
      req.write(postData);
    }
  }
  req.end();
});
