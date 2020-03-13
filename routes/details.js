/* eslint-disable new-cap */
const express = require('express');
const func = require('./details/details_func');
const router = express.Router();

router.get('/', (req, res) => {
  const id = Number(req.query.id);

  const details = async (id) => {
    try {
      // Get data from Redis
      const getRedisDataResult = await func.getRedisData(id);

      if (typeof (getRedisDataResult) == 'object') {
        console.log('Details Redis有資料');
        // 顯示資料
        const Data = func.insertData(getRedisDataResult);
        res.send(Data);
      } else if (getRedisDataResult == false) {
        console.log('Details Redis沒資料');
        // 從MySQL拿到資料並存進Redis
        const getSQLDataResult = await func.getData(id);
        // 存進Redis
        func.setRedisData(getSQLDataResult, id);
        // 顯示資料
        const Data = await func.insertData(getSQLDataResult);
        res.send(Data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  details(id);
});

module.exports = router;
