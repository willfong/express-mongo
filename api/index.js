const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const DB = require('./db');
const CACHE = require('./cache');

// Setup
const app = express()
app.use(bodyParser.json())
app.use(cors())


// Routes
app.get('/', (req, res) => {
  res.json({msg: 'Hello World!'});
});

app.get('/all', async (req, res) => {
	const kittens = await DB.Kitten.find();
	console.log(kittens);
  res.send(kittens);
})

app.post('/add', (req, res) => {
	const newKitten = new DB.Kitten({ name: req.body.name });
	newKitten.save();
	res.json(newKitten);
});

app.get('/cacheGet', async (req, res) => {
	const key = req.query.key;
	const response = await CACHE.get(key);
	res.json(response);
})

app.post('/cacheSet', async (req, res) => {
	const key = req.body.key;
	const value = req.body.value;
	const ttl = req.body.ttl;
	await CACHE.set(key, value, ttl);
	const response = await CACHE.get(key);
	res.json(response);
});



// Start Service
const port = 3000
app.listen(port, () => {
  console.log(`API server started: http://localhost:${port}`)
})