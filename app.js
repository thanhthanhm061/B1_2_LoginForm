var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var bookingRoutes = require('./routes/bookingRoutes'); // Import routes quản lý lịch đặt chỗ

var app = express();

// middleware
app.use(logger('dev')); // Log các request
app.use(express.json()); // Xử lý JSON payload
app.use(express.urlencoded({ extended: false })); // Xử lý dữ liệu từ form
app.use(cookieParser()); // Xử lý cookies
app.use(express.static(path.join(__dirname, 'public'))); // Cung cấp các tài nguyên tĩnh từ thư mục 'public'

// Kết nối MongoDB
require('dotenv').config(); // Load các biến môi trường từ file .env

// Sửa lại cách kết nối với MongoDB bằng mongoose.connect()
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });


// Định tuyến
app.use('/api/bookings', bookingRoutes); // Định tuyến cho booking

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, chỉ cung cấp thông báo lỗi trong môi trường phát triển
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render trang lỗi
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
