import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import studentRoutes from "./routes/studentroutes.js";

const app = express();

app.use(express.json());

app.use("/students", studentRoutes);

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("mongo connected");
}).catch((err)=>{
    console.log(err);
});

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});

