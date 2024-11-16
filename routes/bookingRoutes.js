const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

// Đặt chỗ mới
router.post('/bookings', bookingController.createBooking);

// Xem danh sách lịch đặt chỗ
router.get('/bookings', bookingController.getBookings);

// Cập nhật lịch đặt chỗ
router.put('/bookings/:id', bookingController.updateBooking);

// Hủy lịch đặt chỗ
router.patch('/bookings/:id', bookingController.cancelBooking);

module.exports = router;
