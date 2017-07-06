import express from 'express';
import bodyParser from 'body-parser'

import { sendMessage, getChannels } from './utils/slack'

// Create a server with a host and port
const app = express()

app.use(bodyParser())

const PORT = process.env.PORT || 8000;

app.get('/', (req, res)=>{
    res.send("Working!")
})

app.post('/send',(req, res)=>{
    let response = sendMessage(req.body);
    res.send("sended")
})


app.listen(PORT, ()=>{
    console.log('====================================');
    console.log("App it's running on Port: ", PORT);
    console.log('====================================');
})