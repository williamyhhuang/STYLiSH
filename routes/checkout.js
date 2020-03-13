/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const func = require('./checkout/checkout_func');
const dbQuery = require('./checkout/checkout_db');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {
  const prime = req.body.prime;

  // 個人資料
  const recipient = req.body.order.recipient;

  // 價錢
  const subtotal = req.body.order.subtotal;
  const freight = req.body.order.freight;
  const total = req.body.order.total;

  // 商品
  const productList = req.body.order.list;

  // 確認商品相關資訊, 若無問題則新增購買資訊及更新庫存
  // 若以上都沒問題則付款給TapPay
  const afterCheck = async (prime, recipient, productList, subtotal, freight, total) => {
    const totalResult = {};
    try {
      const stockNow = [];
      const issueResult = [];
      const qtyEach = productList.map((el) => el.qty);
      const priceEach = productList.map((el) => el.price);

      for (let i = 0; i < productList.length; i++) {
        let issue = false;
        const productEach = productList[i];
        const productID = productEach.id;
        const color = productEach.color.code;
        const size = productEach.size;
        const qty = Number(productEach.qty);
        const price = Number(productEach.price);

        // 確認價格
        const priceResult = await func.checkPrice(productID, price);

        // 確認尺寸庫存
        const sizeResult = await func.checkSize(productID, size, color, qty);

        stockNow.push(sizeResult.stock);

        if (priceResult == true && sizeResult.result == true) {
          issue = true;
        }
        issueResult.push(issue);
      }
      // 確認總價
      if (issueResult.indexOf(false) < 0) {
        const calculateResult = await func.checkCalculate(qtyEach, priceEach, subtotal, freight, total);
        if (calculateResult == true) {
          // 若以上都沒問題, 則更新資料庫及新增購買資訊

          totalResult.orderID = await dbQuery.updateDB(stockNow, recipient, productList, subtotal, freight, total);
          console.log('order', totalResult.orderID);

          const name = recipient.name;
          const phone = recipient.phone;
          const email = recipient.email;

          // 回傳購買者資訊給TapPay
          const tapPayResult = await func.tapPay(prime, phone, name, email, productList);

          // 存入付款資料庫
          const insertPaymentResult = await dbQuery.insertPayment(totalResult, tapPayResult);

          // 更新購買資訊已付款
          dbQuery.updatePayment(totalResult, insertPaymentResult);
        }
      }
    } catch (e) {
      console.log('error', e);
      totalResult.error = e;
    }
    return totalResult;
  };
  // 送訂單編號回前端
  afterCheck(prime, recipient, productList, subtotal, freight, total)
      .then((value) => {
        if (value.error != null) {
          res.send(value.error);
        } else {
          let package = {
            data: {
              number: String(value.orderID),
            },
          };
          package = JSON.stringify(package);
          res.send(package);
        }
      });
});

module.exports = router;
