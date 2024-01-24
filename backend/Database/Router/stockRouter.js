import express from 'express'
const stockRouter = express.Router()
import axios from 'axios';
import StockData from '../Schema.js'

// POST endpoint to store data
stockRouter.post('/', async (req, res) => {
    try {
      // Fetch data from WazirX API
      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const top10Results = Object.values(response.data).slice(0, 10);
  
      // Store data in MongoDB
      for (const result of top10Results) {
        await StockData.create({
          name: result.name,
          last: parseFloat(result.last),
          buy: parseFloat(result.buy),
          sell: parseFloat(result.sell),
          volume: parseFloat(result.volume),
          base_unit: result.base_unit,
        });
      }
  
      res.json({ success: true, message: 'Data stored successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  
  // GET endpoint to retrieve stored data
stockRouter.get('/', async (req, res) => {
    try {
      // Retrieve data from MongoDB
      const data = await StockData.find();
      res.json({ success: true, data });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  export default stockRouter
