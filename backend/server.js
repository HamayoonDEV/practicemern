import express from "express";
import { PORT } from "./config/index.js";
import router from "./router/index.js";
import dbConnect from "./database/database.js";
import errorHandler from "./middleware/errorHandler.js";
const app = express();

dbConnect();

app.use(express.json());

app.use(router);

app.use(errorHandler);
app.listen(PORT, console.log(`server is runing on PORT: ${PORT}`));
