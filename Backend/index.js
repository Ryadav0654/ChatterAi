import express from "express";
import 'dotenv/config'

const app = express();

const port = process.env.PORT || 8080;

// console.log(process.env);

app.get("/", (req, res) => {
    res.send("Chat with chatter");
})

app.listen(port, () => {
    console.log(`app is live in port ${port}`);
})