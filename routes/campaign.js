/* eslint-disable spaced-comment */
/* eslint-disable new-cap */
/* eslint-disable max-len */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const awsCred = require('../scripts/aws_credential');
const s3 = new aws.S3(awsCred);
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const func = require('./campaign/campaign_func');
const dbQuery = require('./campaign/campaign_db');

client.on('connect', () => {
  // console.log('Redis client connected from campaign');
});

router.use(bodyParser.json());

aws.config.update({
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'williamyhhuang-stylish',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function(req, file, cb) {
      cb(null, 'uploads_campaign/'+file.fieldname + '-' + Date.now() + '.jpg'); //use Date.now() for unique file keys
    },
  }),
});

// // Store images to local file by Mutler
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'uploads_campaign/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '.jpg');
//   },
// });

// const upload = multer({storage: storage});
const cpUpload = upload.array('campaign_images', 3);

router.post('/', cpUpload, (req, res, next) => {
  // set the parameters
  const campaignId = req.body.campaign_id;
  const campaignStory = req.body.campaign_story;
  const campaignImages = req.files;
  const protocol = req.protocol;
  const host = req.get('host');

  const campaign = async (campaignId, campaignStory, campaignImages, protocol, host) => {
    try {
      // get every product's ID
      const index = [];
      const productId = await dbQuery.getProductId();
      for (let i = 0; i < productId.length; i++) {
        index.push(productId[i].id);
      }
      // get the campaign images' path
      let campaignImagesPath = '';
      for (let i = 0; i < req.files.length; i++) {
        campaignImagesPath += req.files[i].location + ' ';
      }
      campaignImagesPath = campaignImagesPath.split(' ');
      campaignImagesPath.pop().toString();

      if (index.indexOf(campaignId) < 0) {
        res.send('Invalid product ID');
      } else {
        // insert campaign product data
        const insertCampaignDataResult = await dbQuery.insertCampaignData(campaignId, campaignStory);
        // insert campaign product images
        const insertCampaignImagesResult = [];
        for (let i = 0; i < campaignImagesPath.length; i++) {
          const result = dbQuery.insertCampaignImages(protocol, host, campaignId, campaignImagesPath[i]);
          insertCampaignImagesResult.push(result);
        }
        if (insertCampaignDataResult) {
          res.send('success message from adding campaign product.');
        }
      }
    } catch (e) {
      res.send(e);
    }
  };
  campaign(campaignId, campaignStory, campaignImages, protocol, host);

  // 清除Redis
  client.flushdb(function(err, succeeded) {
    if (err) throw err;
    console.log('Clear Redis from campaign router result: ', succeeded);
  });
});

module.exports = router;
