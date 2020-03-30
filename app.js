const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', express.static(__dirname + '/'));
app.use('/', express.static(__dirname + '/public'));
app.use('/admin', express.static(__dirname + '/admin'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/uploads_campaign', express.static(__dirname + '/uploads_campaign'));

// 讀取圖片設定
app.get('./uploads', function(req, res) {
  const images = req.path;
  res.send('<html><body>' +
        `<img src=${images} >` +
        '</body></html>');
});

app.get('./uploads_campaign', function(req, res) {
  const images = req.path;
  res.send('<html><body>' +
        `<img src=${images} >` +
        '</body></html>');
});

// 各個router設定
const productRoutes = require('./routes/product');
app.use('/product', productRoutes);
const campaignRoutes = require('./routes/campaign');
app.use('/campaign', campaignRoutes);
const campaignAPIRoutes = require('./routes/campaignAPI');
app.use('/api/1.0/marketing/campaign', campaignAPIRoutes);
const allRoutes = require('./routes/all');
app.use('/products/all', allRoutes);
const menRoutes = require('./routes/men');
app.use('/products/men', menRoutes);
const womenRoutes = require('./routes/women');
app.use('/products/women', womenRoutes);
const acceRoutes = require('./routes/accessories');
app.use('/products/accessories', acceRoutes);
const searchRoutes = require('./routes/search');
app.use('/products/search', searchRoutes);
const detailsRoutes = require('./routes/details');
app.use('/products/details', detailsRoutes);
const signUpRoutes = require('./routes/signUp');
app.use('/api/1.0/user/signup', signUpRoutes);
const signInRoutes = require('./routes/signIn');
app.use('/api/1.0/user/signin', signInRoutes);
const userProfileRoutes = require('./routes/userProfile');
app.use('/api/1.0/user/profile', userProfileRoutes);
const checkOutRoutes = require('./routes/checkout');
app.use('/order/checkout', checkOutRoutes);
// const s3Routes = require('./routes/s3');
// app.use('/s3', s3Routes);

app.listen(port, () => {
  console.log('stylish is running on port 3001!');
});
