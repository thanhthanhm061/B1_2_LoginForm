const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Đọc file JSON để lấy dữ liệu về biển số xe
const vehiclePlates = JSON.parse(fs.readFileSync('vehicle_plates.json', 'utf8'));

// Phục vụ các file tĩnh trong thư mục 'public'
app.use(express.static('public'));

app.get('/provinces', (req, res) => {
    const provinces = vehiclePlates.map(entry => entry.province);
    res.json(provinces);
  });
  
  // API lấy biển số xe dựa theo tỉnh thành
  app.get('/plates', (req, res) => {
    const province = req.query.province;
    const plateInfo = vehiclePlates.find(entry => entry.province === province);
    
    if (plateInfo) {
      res.json(plateInfo);
    } else {
      res.json({ error: 'No plates found for the selected province.' });
    }
  });

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
