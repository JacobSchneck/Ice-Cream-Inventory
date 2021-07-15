const express = require('express');
const router = express.Router();

// mock data
const  icecreams = [
	{
		id: 1,
		flavor: "chocolate",
		brand: "NadaMoo",
	},
	{
		id: 2,
		flavor: "Strawberry",
		brand: "Hudsonville",
	},
	{
		id: 3,
		flavor: "Pistacio",
		brand: "Haagen-Dazs",
	},
	{
		id: 4,
		flavor: "Chunky Monkey",
		brand: "Ben and Jerry's",
	}
]
	

// HTTP METHODS
router.get('/', (req, res) => {
	res.json(icecreams);
});

router.get('/id/:id', (req, res) => {
	const { id } = req.params;
	res.json(icecreams.filter( ic => ic.id == parseInt(id) ));
});

router.post('/', (req, res) => {
	console.log(req.body);
	// res.send("New icecream added");
});


module.exports = router;