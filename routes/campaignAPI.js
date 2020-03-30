/* eslint-disable max-len */
/* eslint-disable new-cap */
require('dotenv').config();
const express = require('express');
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);
const router = express.Router();
const func = require('./campaignAPI/campaignAPI_func');
const dbQuery = require('./campaignAPI/campaignAPI_db');

client.on('connect', () => {
  // console.log('Redis client connected');
});

router.get('/', (req, res) => {
  const paging = Number(req.query.paging);

  const campaign = async (paging) => {
    try {
      let campaignProduct; let campaignImages;

      // Get data from Redis
      campaignProduct = JSON.parse(await getAsync('campaignProduct'));
      campaignImages = JSON.parse(await getAsync('campaignImages'));

      if (campaignProduct != null && campaignProduct != null) {
        console.log('Campaign Redis有資料');
      }
      // 如果Redis沒資料, 則從MySQL取
      if (campaignProduct == null || campaignProduct == null) {
        campaignProduct = (await dbQuery.displaycampaignProduct());
        campaignImages = (await dbQuery.displaycampaignImages());

        console.log('Campaign Redis沒資料');
        client.set('campaignProduct', JSON.stringify(campaignProduct));
        client.set('campaignImages', JSON.stringify(campaignImages));
      }

      // 如果顯示每筆
      const productSet = 2;
      const totalItem = campaignProduct.length;
      let totalPage;

      if (totalItem % productSet != 0) {
        totalPage = Math.floor(totalItem / productSet) + 1;
      } else {
        totalPage = Math.floor(totalItem / productSet);
      }

      if (isNaN(paging)) {
        paging = 0;
      }

      if (paging < totalPage) {
        const Data = func.insertData(totalItem, totalPage, paging, productSet, campaignProduct, campaignImages);
        res.send(Data);
      } else if (paging >= (totalItem / productSet)) {
        res.send({'data': []});
      }
    } catch (e) {
      console.log(e);
    }
  };

  campaign(paging);
});

module.exports = router;
