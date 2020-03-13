/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
const awsCred = require('../scripts/aws_credential');
const s3 = new aws.S3(awsCred);

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
      cb(null, 'campaign/'+file.fieldname + '-' + Date.now() + '.jpg'); //use Date.now() for unique file keys
    },
  }),
});

//use by upload form
router.post('/', upload.array('upl', 1), function(req, res, next) {
  console.log('location url', req.files[0].location);
  res.send('Uploaded!');
});

module.exports = router;
