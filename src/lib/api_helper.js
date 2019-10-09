const request = require('request');

const BASE_API = 'https://api.motorsportreg.com/'

module.exports.BASE_API = BASE_API;

module.exports.get = (url) => {
  return new Promise((resolve, reject) => {
    request.get(`${BASE_API}${url}`, { json: true }, (err, res, body) => {
      if (err) reject(err)
      resolve(body)
    });
  })
}