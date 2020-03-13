/* eslint-disable camelcase */
const database = require('../../scripts/mysql');
const db = database.db;

const displayProduct = (keyword) => {
  return new Promise((resolve, reject) => {
    const sql_product = `SELECT * FROM product 
            WHERE id LIKE '${keyword}' OR title LIKE '${keyword}' 
            OR description LIKE '${keyword}'
            OR price LIKE '${keyword}'
            OR texture LIKE '${keyword}'
            OR wash LIKE '${keyword}'
            OR place LIKE '${keyword}'
            OR note LIKE '${keyword}'
            OR catagory LIKE '${keyword}'
            OR story LIKE '${keyword}'`;
    db.query(sql_product, (err, resp) => {
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
    db.query(`SELECT name,color_code,product_id FROM color`, (err, resp) => {
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
    db.query(`SELECT * FROM main_image`, (err, resp) => {
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
    db.query(`SELECT * FROM images`, (err, resp) => {
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
    const sql = `SELECT * FROM variant`;
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
  displayVariant,
  displayColor,
  displayMainImage,
  displayImages,
};
