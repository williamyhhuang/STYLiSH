/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
const dbQuery = require('./search_db');

function toObject(keys, values) {
  const result = {};
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }
  return result;
}

const getData = async (keyword) => {
  const product = await dbQuery.displayProduct(keyword);
  const variant = await dbQuery.displayVariant();
  const color = await dbQuery.displayColor();
  const main_image = await dbQuery.displayMainImage();
  const Images = await dbQuery.displayImages();

  const product_keys = product.map((item) => Object.keys(item));
  const product_values = product.map((item) => Object.values(item));

  const getDataResult = {
    product: product,
    variant: variant,
    color: color,
    main_image: main_image,
    Images: Images,
    product_keys: product_keys,
    product_values: product_values,
  };
  return getDataResult;
};

function insertData(totalPage, paging, product_set, getDataResult) {
  let nextPaging;
  const product = getDataResult.product;
  const variant = getDataResult.variant;
  const color = getDataResult.color;
  const main_image = getDataResult.main_image;
  const Images = getDataResult.Images;
  const product_keys = getDataResult.product_keys;
  const product_values = getDataResult.product_values;

  let start;
  let end;
  if (Number(totalPage) <= Number(Number(paging) + 1)) {
    nextPaging = '';
  } else {
    nextPaging = Number(Number(paging) + 1);
  }

  if (product_set * (paging + 1) > product.length) {
    start = Number(product_set * paging);
    end = product.length;
  } else {
    start = Number(product_set * paging);
    end = product_set * (paging + 1);
  }

  let variant_count = 0;
  for (let i = start; i < end; i++) {
    const product_id = product[i].id;
    // console.log('product_id is :' + product_id);
    for (let j = 0; j < variant.length; j++) {
      if (variant[j].product_id == product_id) {
        variant_count++;
      }
    }
  }
  // console.log('Sum of variant is :' + variant_count);

  const Package = [];
  const Data = {};
  for (let i = start; i < end; i++) {
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

  Data.data = Package;
  Data.next_paging = nextPaging;

  if (nextPaging == '') {
    delete Data.next_paging;
  }

  for (let i = 0; i < Data.data.length; i++) {
    for (let j = 0; j < Data.data[i].variant.length; j++) {
      delete Data.data[i].variant[j].product_id;
    }
    for (let j = 0; j < Data.data[i].color.length; j++) {
      delete Data.data[i].color[j].product_id;
    }
  }
  return Data;
}
module.exports = {
  toObject,
  getData,
  insertData,
};
