const Booking = require('../models/bookingModel');

// Tạo lịch đặt chỗ mới
exports.createBooking = async (req, res) => {
  try {
    const { customerName, date, time } = req.body;

    // Kiểm tra tránh đặt chỗ trùng
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
      return res.status(400).send('Slot already booked.');
    }

    const booking = new Booking({ customerName, date, time });
    await booking.save();
    res.status(201).send('Booking created successfully!');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Lấy danh sách lịch đặt chỗ
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Cập nhật lịch đặt chỗ
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, date, time } = req.body;

    await Booking.findByIdAndUpdate(id, { customerName, date, time });
    res.send('Booking updated successfully!');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Hủy lịch đặt chỗ
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndUpdate(id, { status: 'Cancelled' });
    res.send('Booking cancelled successfully!');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
