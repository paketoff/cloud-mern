const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const fileUpload = require("express-fileupload");
const authRouter = require("./routes/auth.routes");
const corsMiddleware = require('./middleware/cors.middleware');
const fileRouter = require("./routes/file.routes");

const app = express();
const PORT = config.get('serverPort');

app.use(corsMiddleware);
app.use(express.json()); 
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);
app.use(fileUpload({}));

const start = async () => {
    try {
        await mongoose.connect(config.get("dbURL"));

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT);
        })
    } catch (e) {

    }
}

start();