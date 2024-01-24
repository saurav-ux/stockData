import express from "express";
import cors from 'cors'
const app = express()
import './Database/connection.js'
import stockRouter from "./Database/Router/stockRouter.js";
app.use(cors())
app.use(cors({
    origin:['https://deploy-mern-1whq.vercel.app'],
    methods:['POST','GET','DELETE'],
    credentials:true
  }))
const PORT= 5777;
app.use(express.json());

app.get('/',(req,res)=>{
    console.log("Saurav");
    res.send("Hello Saurav")
}
) 

app.use('/stockData',stockRouter)
app.listen(PORT,()=>{
    console.log(`Server is running on : http://localhost:${PORT}`)
})