// Server Stuff
const express = require('express');
const app = express();
const PORT = 5000;

// API STUFF
const icecream = require('./Icecream');
app.use('/', icecream);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

