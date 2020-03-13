/* eslint-disable max-len */

const database = require('../../scripts/mysql');
const db = database.db;

// 單價總價庫存都沒問題, 則更新庫存且新增購買資訊
const updateDB = (stockNow, recipient, productList, subtotal, freight, total) => {
  return new Promise((resolve, reject) => {
    const name = recipient.name;
    const phone = recipient.phone;
    const email = recipient.email;
    const address = recipient.address;
    const time = recipient.time;

    // 新增購買者資訊
    const sqlPurchaseUser = `INSERT INTO order_user_list SET ?`;
    const postPurchaseUser = {
      name: name,
      phone: phone,
      email: email,
      address: address,
      time: time,
      status: 'unpaid',
    };

    db.query(sqlPurchaseUser, postPurchaseUser, (err, result) => {
      if (err) {
        reject(err);
      };
      // 回傳訂單編號
      resolve(result.insertId);
      // console.log("購買者資訊", result);
      for (let i = 0; i < productList.length; i++) {
        const productID = productList[i].id;
        const size = productList[i].size;
        const color = productList[i].color.code;
        const qty = productList[i].qty;

        // 更新庫存
        const sqlUpdate = `UPDATE variant SET ? WHERE product_id = '${productID}' AND size = '${size}' AND color_code = '${color}' `;
        const postUpdate = {
          stock: Number(stockNow[i]) - qty,
        };
        db.query(sqlUpdate, postUpdate, (err, result) => {
          if (err) {
            reject(err);
          };
          // console.log("更新庫存", result);
        });

        // 新增此筆購買資訊
        const sqlPurchaseOrder = `INSERT INTO order_list SET ?`;
        const postPurchaseOrder = {
          product_id: productID,
          color: color,
          size: size,
          qty: qty,
          order_user_list_order_id: result.insertId,
        };
        db.query(sqlPurchaseOrder, postPurchaseOrder, (err, result) => {
          if (err) {
            reject(err);
          };
          // console.log("新增購買資訊", result);
        });
      }
      // 新增此筆價格明細
      const sqlPurchasePrice = `INSERT INTO total_price_list SET ?`;
      const postPurchasePrice = {
        subtotal: subtotal,
        freight: freight,
        total: total,
        order_user_list_order_id: result.insertId,
      };
      db.query(sqlPurchasePrice, postPurchasePrice, (err, result) => {
        if (err) {
          reject(err);
        };
        // console.log("新增此筆明細", result);
      });
    });
  });
};

// 存入付款資料庫
const insertPayment = (totalResult, result) => {
  return new Promise((resolve, reject) => {
    const sqlPay = `INSERT INTO pay_list SET ?`;
    const postPay = {
      order_id: totalResult.orderID,
      acquirer: result.data.acquirer,
      rec_trade_id: result.data.rec_trade_id,
      bank_transaction_id: result.data.bank_transaction_id,
      card_identifier: result.data.card_identifier,
      merchant_id: result.data.merchant_id,
    };
    db.query(sqlPay, postPay, (err, result) => {
      if (err) reject(err);
      console.log('付款資訊', result);
    });
    resolve(true);
  });
};

// 更新購買資訊已付款
const updatePayment = (totalResult, insertPaymentResult) => {
  return new Promise((resolve, reject) => {
    if (insertPaymentResult == true) {
      const sqlPaymentStatus = `UPDATE order_user_list SET ? WHERE order_id = '${totalResult.orderID}'`;
      const postPaymentStatus = {
        status: 'paid',
      };
      db.query(sqlPaymentStatus, postPaymentStatus, (err, result) => {
        if (err) reject(err);
        console.log('更新付款狀態', result);
      });
    }
  });
};

module.exports = {
  updateDB,
  updatePayment,
  insertPayment,
};
