var path = require('path')
const express = require('express')

// Environment Variables  --MAKE SURE TO CHANGE--
const dotenv = require('dotenv')
dotenv.config()

const api = {
    key: process.env.API_KEY
}

//  --MAKE SURE TO CHANGE--

const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));

// Cors for cross origin allowance
const cors = require('cors');
const { json } = require('body-parser')
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function(req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT || 8081, function() {
    console.log(`FEND Capstone app listening on port ${this.address().port}!`)
})