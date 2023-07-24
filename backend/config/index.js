import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const DATABASE_CONNECTION_STRING = process.env.MONOGODB_CONNECTION;

const ACCESS_TOKEN = process.env.SIGNACCESSTOKEN;
const REFRESH_TOKEN = process.env.SIGNREFRESHTOKEN;

export { PORT, DATABASE_CONNECTION_STRING, ACCESS_TOKEN, REFRESH_TOKEN };
