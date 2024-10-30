import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import Connection from "./Database/db.js"
import router from "./Routes/route.js"
import bodyParser from "body-parser"
const app = express()

dotenv.config()

app.use(express.json())
// app.use(cors({
//     origin: 'http://localhost:5000', 
//     credentials: true 
// }));
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',router);
const port =5000
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD)
app.listen(port, () =>{
    console.log(`server running at http://localhost:${port}`)
})