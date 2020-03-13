/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const express = require('express');
const router = express.Router();
const func = require('./signUp/signUp_func');
const dbQuery = require('./signUp/signUp_db');

router.post('/', function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const signup = async (name, email, password) => {
    try {
      // 檢查email格式
      const checkEmailFormatResult = await func.checkEmailFormat(email);
      // 檢查email有沒有重複
      const checkEmailExsistResult = await dbQuery.checkEmailExsist(email);

      // 如果沒有email重複或是格式問題,則開始key in資料
      if (checkEmailFormatResult == true && checkEmailExsistResult == true ) {
        // 先取得所有註冊資料的ID
        const getDataResult = await dbQuery.getSignUpData();
        // 將所有ID放入矩陣
        const idArray = [];
        for (let i = 0; i < getDataResult.length; i++) {
          idArray.push(getDataResult[i]);
        }
        // 產生一個不重複的亂數ID
        const id = func.getRandomID(0, 99999, idArray);
        // 給token
        const date = Date.now();
        const token = func.createToken(email + date);
        const delayTime = 3600000;
        // 整理資料
        const Data = {};
        const Package = {};
        const memberData = {
          id: id,
          name: name,
          email: email,
        };
        Package.access_token = token;
        Package.access_expired = delayTime;
        Package.user = memberData;
        Data.data = Package;

        // 使用者資料加入資料庫
        const insertSignUpDataResult = await dbQuery.insertSignUpData(id, token, delayTime, name, email, password);
        // 回傳資料給前端
        if (insertSignUpDataResult == true) {
          res.send(Data);
        }
      }
    } catch (e) {
      res.send(e);
    }
  };
  signup(name, email, password);
});

module.exports = router;


