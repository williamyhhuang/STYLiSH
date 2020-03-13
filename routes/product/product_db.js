// const mysql = require('mysql');

const database = require('../../scripts/mysql');
const db = database.db;

const product = (postProduct) => {
  return new Promise((resolve, reject) => {
    const sqlProduct = `INSERT INTO stylish.product SET ?`;
    db.query(sqlProduct, postProduct, (err, result) => {
      if (err) {
        const message = 'something wrong in product query';
        reject(message);
      } else {
        resolve(true);
      }
    });
  });
};

const variant = (variantData) => {
  return new Promise((resolve, reject) => {
    const index = [];
    const sqlVariant = `INSERT INTO stylish.variant SET ?`;
    for (let i = 0; i < variantData.color_code.length; i++) {
      const postVariant = {
        product_id: variantData.productID,
        color_code: variantData.color_code[i],
        size: variantData.size[i],
        stock: variantData.stock[i],
      };
      db.query(sqlVariant, postVariant, (err, result) => {
        if (err) {
          const message = 'something wrong in variant query';
          reject(message);
          index.push(false);
        } else {
          index.push(true);
        }
        if (i == variantData.color_code.length - 1) {
          if (index.indexOf(false) == -1) {
            resolve(true);
          }
        }
      });
    }
  });
};

const color = (colorData) => {
  return new Promise((resolve, reject) => {
    const index = [];
    const sqlColor = `INSERT INTO stylish.color SET ?`;
    for (let i = 0; i < colorData.name.length; i++) {
      const postColor = {
        product_id: colorData.productID,
        name: colorData.name[i],
        color_code: colorData.color_code[i],
      };
      db.query(sqlColor, postColor, (err, result) => {
        if (err) {
          const message = 'something wrong in color query';
          reject(message);
          index.push(false);
        } else {
          index.push(true);
        }
        if (i == colorData.name.length - 1) {
          if (index.indexOf(false) == -1) {
            resolve(true);
          }
        }
      });
    }
  });
};

const mainImage = (postMainImage) => {
  return new Promise((resolve, reject) => {
    const sqlMainImage = `INSERT INTO stylish.main_image SET ?`;
    db.query(sqlMainImage, postMainImage, (err, result) => {
      if (err) {
        const message = 'something wrong in main_image query';
        reject(message);
      } else {
        resolve(true);
      }
    });
  });
};

const images = (imagesData, protocol, host) => {
  return new Promise((resolve, reject) => {
    const index = [];
    for (let i = 0; i < imagesData.images.length; i++) {
      const sqlImages = `INSERT INTO stylish.images SET ?`;
      const postImages = {
        product_id: imagesData.product_id,
        // images: protocol + '://' + host + '/' + imagesData.images[i],
        images: imagesData.images[i],
      };
      db.query(sqlImages, postImages, (err, result) => {
        if (err) {
          const message = 'something wrong in images query';
          reject(message);
          index.push(false);
        } else {
          index.push(true);
        }
        if (i == imagesData.images.length - 1) {
          if (index.indexOf(false) == -1) {
            resolve(true);
          }
        }
      });
    }
  });
};

module.exports = {
  product,
  variant,
  color,
  mainImage,
  images,
};
