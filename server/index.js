import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from "./routes/posts.js";
import usersRoutes from './routes/users.js'
import dotenv from "dotenv"
import expressMonitor from 'express-status-monitor'

const app = express();
dotenv.config();

app.use(expressMonitor());
app.use(bodyParser.json({limit:'30mb', extended: true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended: true}))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', usersRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        return app.listen(PORT, ()=>{console.log(`Server Running on port : ${PORT}`)})
    })
    .catch((error)=> { return console.log(error.message)})

mongoose.set('useFindAndModify', false);