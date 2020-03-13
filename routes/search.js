/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable max-len */
const express = require('express');
const func = require('./search/search_func');
const router = express.Router();

router.get('/', (req, res) => {
  const keyword = String(req.query.keyword);
  let paging = Number(req.query.paging);

  const search = async (keyword) => {
    try {
      const getDataResult = await func.getData(keyword);

      // 如果顯示每筆
      const product_set = 2;
      const totalItem = getDataResult.product.length;
      let totalPage;
      if (totalItem % product_set != 0) {
        totalPage = Math.floor(totalItem / product_set) + 1;
      } else {
        totalPage = Math.floor(totalItem / product_set);
      }

      if (isNaN(paging)) {
        paging = 0;
      }

      if (paging < totalPage) {
        const Data = func.insertData(totalPage, paging, product_set, getDataResult);
        res.send(Data);
      } else if (paging >= (totalItem / product_set)) {
        res.send({ 'data': [] });
      }
    } catch (e) {
      console.log(e);
    }
  };
  search(keyword, paging);
});

module.exports = router;
