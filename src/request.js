const https = require('https');

const request = (options, postData) => new Promise((resolve, reject) => {
  const req = https.request(options, (res) => {
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
        console.log('services/request -> RESPONSE IS NOT JSON', error);
        return resolve({ statusCode, body });
      }
    });
  });

  req.on('error', (e) => reject(e));
  if (postData && (options.method === 'POST' || options.method === 'PUT')) req.write(postData);
  req.end();
});

module.exports = request;
