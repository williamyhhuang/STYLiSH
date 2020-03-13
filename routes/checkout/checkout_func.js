/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const mysql = require('mysql');
const request = require('request');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: '1234',
  database: 'stylish',
});

// 確認單價從前端過來的是否正確
const checkPrice = (productID, price) => {
  return new Promise((resolve, reject) => {
    let message;
    const sql = `SELECT price FROM product WHERE id = '${productID}'`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length == 0) {
        message = 'there is no such product!';
        reject(message);
      } else {
        if (result[0].price == price) {
          resolve(true);
        } else {
          message = 'the price of product is wrong!';
          reject(message);
        }
      }
    });
  });
};

// 若單價正確,則確認庫存
const checkSize = (productID, size, color, qty) => {
  let message;
  return new Promise((resolve, reject) => {
    const sql = `SELECT stock FROM variant WHERE product_id = '${productID}' AND size = '${size}' AND color_code = '${color}'`;
    db.query(sql, (err, result) => {
      console.log('stock', result);
      if (err) {
        reject(err);
      } else {
        if (result.length == 0 || result[0].stock == 0) {
          message = 'there is out of stock!';
          reject(message);
        } else if (result[0].stock >= qty) {
          message = {
            result: true,
            stock: result[0].stock,
          };
          resolve(message);
        }
      }
    });
  });
};

// 確認總價
const checkCalculate = (qty, price, subtotal, freight, total) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return new Promise((resolve, reject) => {
    const productPrice = [];
    for (let i = 0; i < qty.length; i++) {
      const productPriceEach = qty[i] * price[i];
      productPrice.push(productPriceEach);
    }
    const subtotalActual = productPrice.reduce(reducer);
    const totalActual = subtotalActual + freight;
    let result;
    if (subtotalActual != subtotal) {
      message = 'the subtotal price is wrong, please check!';
      result = message;
      reject(result);
    } else if (totalActual != total) {
      message = 'the total price is wrong, please check!';
      result = message;
      reject(result);
    } else {
      result = true;
      resolve(result);
    }
  });
};

// 回傳資料給TapPay
const tapPay = (prime, phone, name, email, productList) => {
  return new Promise((resolve, reject) => {
    const result = {};
    let productName = productList.map((el) => el.name);
    productName = productName.join();

    const postData = {
      'prime': prime,
      'partner_key': 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG',
      'merchant_id': 'AppWorksSchool_CTBC',
      'amount': 1,
      'currency': 'TWD',
      'details': productName,
      'cardholder': {
        'phone_number': phone,
        'name': name,
        'email': email,
      },
      'remember': false,
    };

    const url = 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime';

    const options = {
      uri: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG',
      },
      json: postData,
    };
    function callback(error, resp, body) {
      if (error) {
        reject(error);
      }
      if (!error && resp.statusCode == 200) {
        result.data = body;
        result.issue = true;
        resolve(result);
      }
    }
    request.post(options, callback);
  });
};

module.exports = {
  checkSize,
  checkPrice,
  checkCalculate,
  tapPay,
};

/*
// 單價總價庫存都沒問題, 則更新庫存且新增購買資訊
// const updateDB = (stockNow, recipient, productList, subtotal, freight, total) => {
//   return new Promise((resolve, reject) => {
//     const name = recipient.name;
//     const phone = recipient.phone;
//     const email = recipient.email;
//     const address = recipient.address;
//     const time = recipient.time;

//     // 新增購買者資訊
//     const sqlPurchaseUser = `INSERT INTO order_user_list SET ?`;
//     const postPurchaseUser = {
//       name: name,
//       phone: phone,
//       email: email,
//       address: address,
//       time: time,
//       status: 'unpaid',
//     };

//     db.query(sqlPurchaseUser, postPurchaseUser, (err, result) => {
//       if (err) {
//         reject(err);
//       };
//       // 回傳訂單編號
//       resolve(result.insertId);
//       // console.log("購買者資訊", result);
//       for (let i = 0; i < productList.length; i++) {
//         const productID = productList[i].id;
//         const size = productList[i].size;
//         const color = productList[i].color.code;
//         const qty = productList[i].qty;

//         // 更新庫存
//         const sqlUpdate = `UPDATE variant SET ? WHERE product_id = '${productID}' AND size = '${size}' AND color_code = '${color}' `;
//         const postUpdate = {
//           stock: Number(stockNow[i]) - qty,
//         };
//         db.query(sqlUpdate, postUpdate, (err, result) => {
//           if (err) {
//             reject(err);
//           };
//           // console.log("更新庫存", result);
//         });

//         // 新增此筆購買資訊
//         const sqlPurchaseOrder = `INSERT INTO order_list SET ?`;
//         const postPurchaseOrder = {
//           product_id: product_id,
//           color: color,
//           size: size,
//           qty: qty,
//           order_user_list_order_id: result.insertId,
//         };
//         db.query(sqlPurchaseOrder, postPurchaseOrder, (err, result) => {
//           if (err) {
//             reject(err);
//           };
//           // console.log("新增購買資訊", result);
//         });
//       }
//       // 新增此筆價格明細
//       const sqlPurchasePrice = `INSERT INTO total_price_list SET ?`;
//       const postPurchasePrice = {
//         subtotal: subtotal,
//         freight: freight,
//         total: total,
//         order_user_list_order_id: result.insertId,
//       };
//       db.query(sqlPurchasePrice, postPurchasePrice, (err, result) => {
//         if (err) {
//           reject(err);
//         };
//         // console.log("新增此筆明細", result);
//       });
//     });
//   });
// };
*/

/*
// const check = async (productList, subtotal, freight, total) => {
//   try {
//     const stockNow = [];
//     const issue_result = [];
//     const qty_each = productList.map((el) => el.qty);
//     const price_each = productList.map((el) => el.price);

//     for (let i = 0; i < productList.length; i++) {
//       let issue = false;
//       const product_each = productList[i];
//       const product_id = product_each.id;
//       const color = product_each.color.code;
//       const size = product_each.size;
//       const qty = Number(product_each.qty);
//       const price = Number(product_each.price);

//       // 確認價格
//       const priceResult = await checkPrice(product_id, price);
//       // 確認尺寸庫存
//       const sizeResult = await checkSize(product_id, size, color, qty);
//       stockNow.push(sizeResult.stock);

//       if (priceResult && sizeResult.result) {
//         issue = true;
//       }
//       issue_result.push(issue);
//     }

//     // 若價格尺寸沒問題, 確認總價
//     if (issue_result.indexOf(false) < 0) {
//       await checkCalculate(qty_each, price_each, subtotal, freight, total);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
*/


