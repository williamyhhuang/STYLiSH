/* eslint-disable max-len */
const database = require('../../scripts/mysql');
const db = database.db;

const fbSearch = (userID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM signup WHERE id = '${userID}'`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(result);
      }
    });
  });
};

const updateToken = (userID, newToken, accessExpired) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE signup SET ? WHERE id = '${userID}'`;
    const updateToken = {
      access_token: newToken,
      delayTime: accessExpired,
    };
    db.query(sql, updateToken, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
        console.log('會員登入結果', result);
      }
    });
  });
};

const signUpFb = (id, token, date, expiredTime, provider, name, password, email, picture) => {
  return new Promise((resolve, reject) => {
    const sqlSignUp = `INSERT INTO signup SET ?`;
    const postSignUp = {
      id: id,
      access_token: token,
      access_expired: expiredTime,
      delayTime: Number(date + expiredTime),
      provider: provider,
      name: name,
      password: password,
      email: email,
      picture: picture,
    };
    db.query(sqlSignUp, postSignUp, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
        console.log('臉書會員註冊結果', result);
      }
    });
  });
};

const normalSignInCheck = (email, password) => {
  let message;
  const data = {};
  return new Promise((resolve, reject) => {
    // 檢查email或密碼是否正確
    const sql = `SELECT * FROM signup WHERE email = '${email}' AND password = '${password}'`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      };
      if (result.length == 0) {
        message = 'please enter the correct email and password.';
        reject(message);
      } else {
        data.issue = true;
        data.signupData = result;
        resolve(data);
      }
    });
  });
};

module.exports = {
  fbSearch,
  updateToken,
  signUpFb,
  normalSignInCheck,
};
