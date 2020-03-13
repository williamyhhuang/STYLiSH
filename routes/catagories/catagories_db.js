/* eslint-disable require-jsdoc */
const database = require('../../scripts/mysql');
const db = database.db;

const displayProduct = (cat) => {
  return new Promise((resolve, reject) => {
    let productSQL;
    if (cat == '全部') {
      productSQL = `SELECT * FROM product `;
    } else {
      productSQL = `SELECT * FROM product WHERE catagory ='${cat}'`;
    }
    db.query(productSQL, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

const displayColor = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT name,color_code,product_id FROM color', (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

const displayMainImage = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM main_image', (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

const displayImages = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM images', (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

const displayVariant = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT product_id,color_code,size,stock FROM variant';
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
