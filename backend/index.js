const express = require("express");
const app = express();
require("dotenv").config();
const {isAuth} = require("./middlewares/AuthMiddleware");
const db = require("./config/db");
const cors = require("cors");

const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const followRoutes = require("./routes/follow");
const { cleanUpBin } = require("./utils/cron");


const PORT = process.env.PORT;

//middlewares---
app.use(express.json());
app.use(cors({
    origin: "*",
}));
// app.use(isAuth);

//routes---
//require("./routes/user"); // but we cannot add '/user' in this method---

//OR
app.use("/user", userRoutes); // best to do like this..structured way..
//http:/localhost:8001/user/register

app.use("/blog", blogRoutes);

app.use("/follow", followRoutes);

app.get("/test", isAuth, (req,res)=>{
    res.send({
        status: 200,
        message: "isAuht is successfull",
    })
})


app.listen(PORT, ()=>{
    console.log("Server is running on port: ", PORT);
    cleanUpBin();
})