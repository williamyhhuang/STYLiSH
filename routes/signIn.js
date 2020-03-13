/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const express = require('express');
const router = express.Router();
const func = require('./signIn/signIn_func');
const dbQuery = require('./signIn/signIn_db');

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {
  // 一般登入則提供email,password
  const email = req.body.email;
  const password = req.body.password;
  // 若用FB登入則提供provider, fbToken
  const provider = req.body.provider;
  const fbToken = req.body.fbToken;

  // 臉書登入
  if (provider == 'facebook') {
    // 先用fbToken拿userID及其他資料
    const fbSignIn = async (fbToken) => {
      try {
        // 先從FB拿用戶資料
        let getFBdata = await func.getFB(fbToken);
        getFBdata = JSON.parse(getFBdata);
        const userID = getFBdata.id;

        // 先看帳號是否已註冊
        const fbSearchResult = await dbQuery.fbSearch(userID);

        // 若已註冊過則直接撈資料並更新token及過期時間
        if (fbSearchResult.length != 0) {
          console.log('已註冊過');
          const email = String(fbSearchResult.email);
          // 給新token
          const date = Date.now();
          const delayTime = 3600000;
          const newToken = func.createToken(email + date);
          const accessExpired = Number(date + delayTime);

          // 準備回傳資料
          const Data = {};
          const Package = {};
          Package.access_token = newToken;
          Data.data = Package;

          // update DB's token & expired time
          const updateTokenResult = await dbQuery.updateToken(userID, newToken, accessExpired);
          // 回傳資料給前端
          if (updateTokenResult == true) {
            res.send(Data);
          }
        } else {
          console.log('沒註冊過');
          // 若無責新註冊
          // let getFBdata = await func.getFB(fbToken);
          // getFBdata = JSON.parse(getFBdata);

          const id = getFBdata.id;
          const name = getFBdata.name;
          const email = getFBdata.email;
          const provider = 'facebook';
          const picture = 'null';
          const password = 'null';
          const date = Date.now();
          const expiredTime = 3600000;
          const token = func.createToken(email + date);

          // 準備資料
          const Data = {};
          const Package = {};
          const user = {
            id: id,
            name: name,
            email: email,
            provider: provider,
            picture: picture,
          };
          Package.access_token = token;
          Package.access_expired = expiredTime;
          Package.user = user;
          Data.data = Package;

          // 註冊臉書會員
          const signUpFbResult = await dbQuery.signUpFb(id, token, date, expiredTime, provider, name, password, email, picture);
          // 回傳資料到前端
          if (signUpFbResult == true) {
            res.send(Data);
          }
        }
      } catch (e) {
        res.send(e);
      }
    };
    fbSignIn(fbToken);
  } else if (provider == 'native') {
    // 一般登入
    const normalSignIn = async (email, password) => {
      try {
        // 檢查email或密碼是否正確
        const normalSignInCheckResult = await dbQuery.normalSignInCheck(email, password);

        if (normalSignInCheckResult.issue == true) {
          const userID = normalSignInCheckResult.signupData[0].id;
          const picture = normalSignInCheckResult.signupData[0].picture;
          const name = normalSignInCheckResult.signupData[0].name;
          const provider = normalSignInCheckResult.signupData[0].provider;
          const email = normalSignInCheckResult.signupData[0].email;

          // 給新token
          const date = Date.now();
          const delayTime = 3600000;
          const newToken = func.createToken(email + date);
          const accessExpired = Number(date + delayTime);

          const Data = {};
          const Package = {};
          const memberData = {
            id: userID,
            provider: provider,
            name: name,
            email: email,
            picture: picture,
          };
          Package.access_token = newToken;
          Package.access_expired = delayTime;
          Package.user = memberData;
          Data.data = Package;

          // update DB's token & expired time
          const updateTokenResult = await dbQuery.updateToken(userID, newToken, accessExpired);
          if (updateTokenResult == true) {
            res.send(Data);
          }
        }
      } catch (e) {
        res.send(e);
      }
    };
    normalSignIn(email, password);
  }
});

module.exports = router;
