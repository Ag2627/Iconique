import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import Connection from "./Database/db.js"
const app = express()

dotenv.config()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}));
const port =5000
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD)
app.listen(port, () =>{
    console.log(`server running at http://localhost:${port}`)
})