/* eslint-disable max-len */
const database = require('../../scripts/mysql');
const db = database.db;

const getProductId = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT id FROM product', (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};
const insertCampaignData = (campaignId, campaignStory) => {
  return new Promise((resolve, reject) => {
    const sqlCampaign = `INSERT INTO stylish.campaign_product SET ?`;
    const postCampaign = {
      product_id: campaignId,
      campaign_story: campaignStory,
    };
    db.query(sqlCampaign, postCampaign, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

const insertCampaignImages = (protocol, host, campaignId, campaignImagesPath) => {
  return new Promise((resolve, reject) => {
    const sqlCampaignImages = `INSERT INTO stylish.campaign_images SET ?`;
    const postCampaignImages = {
      product_id: campaignId,
      // campaign_images: protocol + '://' + host + '/' + campaignImagesPath,
      campaign_images: campaignImagesPath,
    };
    db.query(sqlCampaignImages, postCampaignImages, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      };
    });
  });
};

module.exports = {
  getProductId,
  insertCampaignData,
  insertCampaignImages,
};
