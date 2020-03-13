/* eslint-disable max-len */
const database = require('../../scripts/mysql');
const db = database.db;

const displayProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM product WHERE id ="${id}" `, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

const displayColor = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT name,color_code,product_id FROM color WHERE product_id ="${id}"`, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

const displayMainImage = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM main_image WHERE product_id ="${id}"`, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

const displayImages = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM images WHERE product_id ="${id}"`, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

const displayVariant = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT product_id,color_code,size,stock FROM variant WHERE product_id ="${id}"`;
    db.query(sql, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

module.exports = {
  displayProduct,
  displayColor,
  displayMainImage,
  displayImages,
  displayVariant,
};
