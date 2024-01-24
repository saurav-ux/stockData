import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    name: String,
    last: Number,
    buy: Number,
    sell: Number,
    volume: Number,
    base_unit: String,
  });
  
  const StockData = mongoose.model('StockData', dataSchema);
  export default StockData