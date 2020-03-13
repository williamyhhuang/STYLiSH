const database = require('../../scripts/mysql');
const db = database.db;

const verifyToken = (token) => {
  const timeNow = Date.now();
  let message;
  const data = {};
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM signup WHERE access_token = '${token}'`;
    db.query(sql, (err, res) => {
      if (err) throw err;
      if (timeNow >= res[0].delayTime || res.length == 0) {
        message = 'please log out and sign in again.';
        reject(message);
      } else {
        const issue = false;
        data.signupData = res;
        data.issue = issue;
        resolve(data);
      }
    });
  });
};

module.exports = {
  verifyToken,
};
