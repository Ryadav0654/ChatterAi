import express from "express";
import 'dotenv/config'
import { Server } from 'socket.io';

const app = express();

const port = process.env.PORT || 8080;


app.get('/', (req, res) => {
  res.send("Chat with ChatterAi");
});

// console.log(process.env);

const server = app.listen(port, () => {
    console.log(`app is live in port ${port}`);
})

const io = new Server(server);


app.get("/", (req, res) => {
    res.send("Chat with chatter");
})


// socket.io setup
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

