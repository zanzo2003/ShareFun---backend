require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

const connectDB = require('./db');
connectDB();

app.use(express.json({limit: '25mb'}));
const usersRoute = require("./routes/usersRoute");
app.use('/api/users/', usersRoute);
const postsRoute = require('./routes/postsRoute');
app.use('/api/posts/', postsRoute);




app.listen(port, ()=>{
    console.log(`Server is running on PORT: ${port}`);
});