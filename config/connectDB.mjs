import mongoose from "mongoose";

export function connectDB() {
  mongoose
    .connect("mongodb+srv://vannghia16062004:b1xLYByyWkD3YnJC@9112024.4eqdo.mongodb.net/test")
    .then(() => console.log("Connected!"));
}
