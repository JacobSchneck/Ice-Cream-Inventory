// Server Stuff
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({
	origin: "*",
}));

const icecream = require('./Icecream');
app.use('/', icecream);

//
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

