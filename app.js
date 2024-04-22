import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import hpp from 'hpp';
import router from './src/Router/RoutesHandler.js';
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Security modules
app.use(hpp());
app.use(cors());


//Database Connection
const ConnectionString = 'mongodb://localhost:27017/reactauthentication'
mongoose.connect(ConnectionString).
then(res =>{
    console.log('Database connection established');
}).catch(err =>{
    console.log(err);
});

app.use('/api/v1',router)

export default app;