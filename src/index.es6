import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

import { sendMessage, welcomeMessage } from './slack'

import config from './config'

// Create a server with a host and port
const app = express()

app.use(bodyParser())

const PORT = process.env.PORT || 8000;

const API_KEY = process.env.API_KEY

const SECRET_API_KEY = process.env.SECRET_API_KEY

const userAuth = (req, res, next)=>{
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {

		jwt.verify(token, config.secret, function(err, decoded) {      
			if (err) return res.json({ success: false, message: 'Failed to authenticate token.' });    
			
            req.decoded = decoded;  
            console.log('====================================');
            console.log(decoded);
            console.log('====================================');  
            next();
			
		});

	} 
	else {
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.' 
		});

	}
}

app.get('/', (req, res) =>{
    res.send({
        message: 'Working!',
        state: process.version
    })
})

app.get('/generate-token/:msg/:API_KEY/:SECRET_API_KEY', (req, res)=>{
    console.log('====================================');
    console.log(req.params);
    console.log(process.env.API_KEY);
    console.log('====================================');
    if (req.params.API_KEY == API_KEY && req.params.SECRET_API_KEY == SECRET_API_KEY) {
        let token = jwt.sign({ auth : true }, config.secret);
        if (req.params.msg) welcomeMessage()
        res.send(token)
    }
    else{
        res.send("User not allow!")
    }
    
})

app.post('/send', userAuth ,(req, res)=>{
    let response = sendMessage(req.body);
    res.send("sended")
})


app.listen(PORT, ()=>{
    console.log('====================================');
    console.log("App it's running on Port: ", PORT);
    console.log('====================================');
})