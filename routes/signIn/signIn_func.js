/* eslint-disable require-jsdoc */
const crypto = require('crypto');
const request = require('request');

const getFB = (fbToken) => {
  return new Promise((resolve, reject) => {
    const url = 'https://graph.facebook.com/v5.0/me?fields=id,name,email&access_token=' + fbToken;
    request(url, function(error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

function createToken(email) {
  const hashEmail = crypto.createHash('sha1');
  hashEmail.update(email);
  const token = hashEmail.digest('hex');
  return token;
};

module.exports = {
  getFB,
  createToken,
};
