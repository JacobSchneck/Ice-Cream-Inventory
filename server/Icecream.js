const express = require('express');
// const cors = require('cors');
const router = express.Router();

// mock data
const  icecreams = [
	{
		// id: 1,
		flavor: "Chocolate",
		brand: "NadaMoo",
	},
	{
		// id: 2,
		flavor: "Strawberry",
		brand: "Hudsonville",
	},
	{
		// id: 3,
		flavor: "Pistacio",
		brand: "Haagen-Dazs",
	},
	{
		// id: 4,
		flavor: "Chunky Monkey",
		brand: "Ben and Jerry's",
	}
]
	

// HTTP METHODS
router.get('/', (req, res) => {
	res.json(icecreams);
});

router.get('/flavor/:flavor', (req, res) => {
	const { flavor } = req.params;
	res.json(icecreams.filter( ic => ic.flavor === flavor ));
});

router.get('/brand/:brand', (req, res) => {
	const { brand } = req.params;
	res.json(icecreams.filter( ic => ic.brand === brand ));
})

router.post('/', (req, res) => {
	const icecream = req.body;
	console.log(icecream);
	icecreams.push(icecream);
	res.send(icecream);
});


module.exports = router;