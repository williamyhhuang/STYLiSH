/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
const dbQuery = require('./details_db');
const redis = require('redis');
const client = redis.createClient();
const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

// 將product的key,value分開
function toObject(keys, values) {
  const result = {};
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }
  return result;
};

const getData = async (id) => {
  const product = await dbQuery.displayProduct(id);
  // const variant = await dbQuery.displayVariant(id);
  // const color = await dbQuery.displayColor(id);
  // const main_image = await dbQuery.displayMainImage(id);
  // const Images = await dbQuery.displayImages(id);

  // const product_keys = product.map((item) => Object.keys(item));
  // const product_values = product.map((item) => Object.values(item));

  const getDataResult = {
    product: product,
    variant: await dbQuery.displayVariant(id),
    color: await dbQuery.displayColor(id),
    main_image: await dbQuery.displayMainImage(id),
    Images: await dbQuery.displayImages(id),
    product_keys: product.map((item) => Object.keys(item)),
    product_values: product.map((item) => Object.values(item)),
  };
  return getDataResult;
};

const setRedisData = async (getSQLData, id) => {
  console.log('將資料加入Redis');
  client.set(`product'${id}'`, JSON.stringify(getSQLData.product));
  client.set(`variant'${id}'`, JSON.stringify(getSQLData.variant));
  client.set(`color'${id}'`, JSON.stringify(getSQLData.color));
  client.set(`main_image'${id}'`, JSON.stringify(getSQLData.main_image));
  client.set(`Images'${id}'`, JSON.stringify(getSQLData.Images));
  client.set(`product_keys'${id}'`, JSON.stringify(getSQLData.product_keys));
  client.set(`product_values'${id}'`, JSON.stringify(getSQLData.product_values));

  const setRedisDataResult = {
    product: getSQLData.product,
    variant: getSQLData.variant,
    color: getSQLData.color,
    main_image: getSQLData.main_image,
    Images: getSQLData.Images,
    product_keys: getSQLData.product_keys,
    product_values: getSQLData.product_values,
  };
  return setRedisDataResult;
};

const getRedisData = async (id) => {
  const getRedisDataResult = {
    product: JSON.parse(await getAsync(`product'${id}'`)),
    variant: JSON.parse(await getAsync(`variant'${id}'`)),
    color: JSON.parse(await getAsync(`color'${id}'`)),
    main_image: JSON.parse(await getAsync(`main_image'${id}'`)),
    Images: JSON.parse(await getAsync(`Images'${id}'`)),
    product_keys: JSON.parse(await getAsync(`product_keys'${id}'`)),
    product_values: JSON.parse(await getAsync(`product_values'${id}'`)),
  };

  if (Object.values(getRedisDataResult).indexOf(null) >= 0) {
    return false;
  } else {
    return getRedisDataResult;
  }
};

const insertData = (getDataResult) => {
  const product = getDataResult.product;
  const variant = getDataResult.variant;
  const color = getDataResult.color;
  const main_image = getDataResult.main_image;
  const Images = getDataResult.Images;
  const product_keys = getDataResult.product_keys;
  const product_values = getDataResult.product_values;

  const Package = [];
  const Data = {};
  for (let i = 0; i < product.length; i++) {
    const data = toObject(product_keys[i], product_values[i]);
    const product_id = product[i].id;
    const inputVariant = [];
    const inputSize = [];
    const inputColor = [];
    const inputMainImage = [];
    const inputImages = [];
    inputMainImage.push(main_image[i].main_image);

    for (let j = 0; j < variant.length; j++) {
      if (variant[j].product_id == product_id) {
        inputVariant.push(variant[j]);
        inputSize.push(variant[j].size);
      }
      if (color[j].product_id == product_id) {
        inputColor.push(color[j]);
      }
    }
    for (let k = 0; k < Images.length; k++) {
      if (Images[k].product_id == product_id) {
        inputImages.push(Images[k].images);
      }
    }

    data.variant = inputVariant;
    data.size = inputSize;
    data.color = inputColor;
    data.main_image = inputMainImage;
    data.images = inputImages;
    Package.push(data);
  }

  Data.data = Package[0];

  for (let j = 0; j < Data.data.variant.length; j++) {
    delete Data.data.variant[j].product_id;
    delete Data.data.color[j].product_id;
  }
  return Data;
};

module.exports = {
  toObject,
  getData,
  setRedisData,
  getRedisData,
  insertData,
};
