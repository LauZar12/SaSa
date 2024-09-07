import app from './app.js'

import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended:true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended:true }));
app.use(cors());

app.listen(process.env.PORT)
console.log(`Server running on port: ${process.env.PORT}`)



