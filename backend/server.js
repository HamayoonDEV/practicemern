import express from "express";
import router from "./routes/index.js";
import { PORT } from "./config/index.js";
import dbConnect from "./database/database.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use(errorHandler);
app.listen(PORT, console.log(`server is running on PORT ${PORT}`));
