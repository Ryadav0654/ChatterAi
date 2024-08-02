import express from "express";
import "dotenv/config";
import mongoose, { Mongoose } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import authRouter from "./routers/authRoutes.js";

const app = express();
const port = process.env.PORT || 7000;
const database = process.env.DATABASE_URL;

// middlewares
app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods:["GET","POST", "PUT", "PATCH", "DELETE" ],
    credentials: true,
  })
)



app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);




// routers
app.get("/", (req, res) => {
  res.send("Chat with ChatterAi");
});


// create server
const server = app.listen(port, () => {
  console.log(`app is live in port ${port}`);
});


// database connection 
mongoose
  .connect(database)
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.log(err.message));


// socket api connection
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Chat with chatter");
});

// socket.io setup
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
