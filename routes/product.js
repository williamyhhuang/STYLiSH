/* eslint-disable object-curly-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable spaced-comment */
/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const database = require('../scripts/mysql');
const db = database.db;
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const awsCred = require('../scripts/aws_credential');
const s3 = new aws.S3(awsCred);
const redis = require('redis');
const client = redis.createClient();
const dbInsert = require('./product/product_db');
const func = require('./product/product_func');

router.get('/', (req, res) => {
  res.render('product');
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
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, 'uploads/' + file.fieldname + '-' + Date.now() + '.jpg'); //use Date.now() for unique file keys
    },
  }),
});

// // Store images to local file by Mutler
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '.jpg');
//   },
// });

// const upload = multer({storage: storage});
const cpUpload = upload.fields([{ name: 'single', maxCount: 1 }, { name: 'multiple', maxCount: 2 }]);

router.post('/', cpUpload, (req, res, next) => {
  // get the single image's path
  const singlePath = req.files.single[0].location;
  // get the multiple image's path
  let multiplePath = '';
  for (let i = 0; i < req.files.multiple.length; i++) {
    multiplePath += req.files.multiple[i].location + ' ';
  }
  multiplePath = multiplePath.split(' ');
  multiplePath.pop();

  const productID = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const texture = req.body.texture;
  const wash = req.body.wash;
  const place = req.body.place;
  const note = req.body.note;
  const catagory = req.body.catagory;
  const story = req.body.story;
  const colors = req.body.colors;
  const sizes = req.body.sizes;
  const stock = req.body.stock;
  const mainImage = singlePath;
  const images = multiplePath;
  const protocol = req.protocol;
  const host = req.get('host');

  // Create product table
  const postProduct = {
    id: productID,
    title: title,
    description: description,
    price: price,
    texture: texture,
    wash: wash,
    place: place,
    note: note,
    catagory: catagory,
    story: story,
  };

  // Create Variant table
  const variantData = {
    productID: productID,
    originColor: colors.split(','),
    colors: colors.split(','),
    sizes: sizes.split(','),
    stock: stock.split(','),
  };
  const postVariant = func.variant(variantData);

  // Create color table
  const colorData = {
    productID: productID,
    colors: colors.split(','),
  };
  const postColor = func.color(colorData);

  // Create main_image table
  const postMainImage = {
    product_id: productID,
    // main_image: protocol + '://' + host + '/' + mainImage,
    main_image: mainImage,
  };

  // Create images table
  const postImages = {
    product_id: productID,
    images: images,
  };

  db.getConnection(function (err, connect) {
    if (err) {
      res.send(err);
      connect.rollback(function () {
        connect.release();
      });
    }
    connect.beginTransaction(function (err) {
      if (err) {
        res.send(err);
        connect.rollback(function () {
          connect.release();
        });
      } else {
        (async () => {
          try {
            const productResult = await dbInsert.product(postProduct);
            if (productResult == true) {
              dbInsert.variant(postVariant);
              dbInsert.color(postColor);
              dbInsert.mainImage(postMainImage);
              dbInsert.images(postImages, protocol, host);
              connect.commit(function (err) {
                if (err) {
                  res.send(err);
                  connect.rollback(function () {
                    connect.release();
                  });
                } else {
                  // 清除Redis
                  client.flushdb(function (err, reply) {
                    if (err) {
                      res.send(err);
                    };
                    console.log('Clear Redis from product router result: ', reply);
                  });
                  res.send('Success message from adding new product');
                }
              });
            }
          } catch (e) {
            res.send(e);
          }
        })(); // async
      }
    });
  });
});

module.exports = router;
