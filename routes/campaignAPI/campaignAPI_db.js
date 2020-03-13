/* eslint-disable max-len */
// const client = redis.createClient();
// const {promisify} = require('util');
// const getAsync = promisify(client.get).bind(client);
const database = require('../../scripts/mysql');
const db = database.db;

// Get data from MySQL
const displaycampaignProduct = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT product_id,campaign_story FROM campaign_product', (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};
const displaycampaignImages = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT product_id,campaign_images FROM campaign_images', (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

// Get data from Redis

module.exports = {
  displaycampaignProduct,
  displaycampaignImages,
};
