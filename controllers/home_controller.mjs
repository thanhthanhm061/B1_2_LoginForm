import City from "../models/city.mjs";

class HomeController {
  static async index(req, res) {
    try {
     
      let data = await City.find({});

     
      let city = req.query.city;

      if (!city) {
        return res.render("index", { title: "Home Page", data, plate_no: null, selectedCity: null });
      }

   
      let selectedCity = data.find(c => c.city === city);

      if (!selectedCity) {
       
        return res.render("index", { title: "Home Page", data, plate_no: null, error: "City not found" });
      }

    
      let plate_no = selectedCity.plate_no;

      return res.render("index", { title: "Home Page", data, plate_no, selectedCity });

    } catch (error) {
      console.error("Error fetching cities:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
}

export default HomeController;
