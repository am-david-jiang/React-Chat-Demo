// Essential Libraries that need to be imported
const http = require("http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// Router and Error Handler import
const authRouter = require("./router/AuthRouter");
const userRouter = require("./router/UserRouter");
const errorHandler = require("./middleware/ErrorHandler");
const { createSocket } = require("./router/Socket");

// Dotenv Configuration
require("dotenv").config();

// Create Express Instance
const app = express();
const httpServer = http.createServer(app);
const io = createSocket(httpServer);

// Middlewares Configuration
// 1. CORS
// 2. json
// 3. urlencoded
// 4. cookie-parser
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
    maxAge: 1 * 60 * 60,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  express.static("./public", {
    maxAge: 1 * 24 * 60 * 60 * 1000,
  })
);

// Database Configuration and Connection
require("./config/db.js");
// Passport.js JWT Authentication Configuration
require("./config/passport.js");

// Auth Router
app.use("/auth", authRouter);
// User Router
app.use("/user", userRouter);
// Error Handler
app.use(errorHandler);

// Server to Listen
httpServer.listen(process.env.SERVER_PORT, () =>
  console.log("Server Listening on port ", process.env.SERVER_PORT)
);
