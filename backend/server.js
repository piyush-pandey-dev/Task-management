import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import authRoute from "./src/routes/authRoute.js";
import taskRoute from "./src/routes/taskRoutes.js"

dotenv.config();
connectDB();

const app=express();

const corsOptions = {
    origin: ['https://task-management-topaz-pi.vercel.app'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));app.use(express.json())

app.use(morgan("dev"));

app.get('/',(req,res)=>{
  res.send("this is a home page")
})

app.use('/api/auth',authRoute)
app.use('/api/task',taskRoute)

const PORT=process.env.PORT || 8000;

app.listen(PORT,()=>{
  console.log(`server is running at port ${PORT}`.bgCyan.white)
})

