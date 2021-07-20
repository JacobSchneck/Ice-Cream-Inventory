const express = require('express');
// const cors = require('cors');
const router = express.Router();

// mock data
const  icecreams = [
	{
		id: 1,
		flavor: "Chocolate",
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
	
// database
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/icecream.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to icecream database');
});

db.serialize( () => {
	db.each('SELECT * FROM icecream', (err, row) => {
		if (err) {
			console.error(err.message);
		}
		console.log(row.id + '\t' + row.flavor + '\t' + row.brand);
	});
});


// HTTP METHODS
router.get('/', (req, res) => {
	const sql = " SELECT * FROM icecream";
	// const result = [];
	db.all(sql, [], (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

router.get('/flavor/:flavor', (req, res) => {
	const { flavor } = req.params;
	const sql = ` SELECT * FROM icecream WHERE flavor = ?`;
	db.all(sql, [flavor], (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

router.get('/id/:id', (req, res) => {
	const { id } = req.params;
	const sql = ` SELECT * FROM icecream WHERE id = ?`;
	db.all(sql, [id], (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

router.get('/brand/:brand', (req, res) => {
	const { brand } = req.params;
	const sql = ` SELECT * FROM icecream WHERE brand = ?`;
	db.all(sql, [brand], (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
})

router.post('/', (req, res) => {
	const icecream = req.body;
	const sql = `INSERT INTO icecream
					 (id, flavor, brand)
					 VALUES
					 (?, ?, ?)`;

	db.run(sql, [icecream.id, icecream.flavor, icecream.brand], (err) => {
		if (err) {
			throw err;
		}
		console.log(`${icecream} inserted into database`);
	})
	res.send("Post completed");
});

router.delete('/id/:id', (req, res) => {
	const { id } = req.params;
	const sql = `DELETE FROM icecream WHERE id = ?`;
	db.all(sql, [id], (err, result) => {
		if (err) {
			throw err;
		}
		console.log(`${result} removed from table`);
	});
	res.send("Delete completed");
});

router.put('/id/:id', (req, res) => {
	const { id, flavor, brand} = req.body; 
	console.log(req.body);
	const sql = `UPDATE icecream
					 SET 
					 	flavor = ?,
						brand = ?
					WHERE id = ?`;
	db.run(sql, [flavor, brand, id], (err, result) => {
		if (err) {
			return console.error(err.message);
		}
		console.log(`updated table`);
	});
	res.send("Put completed");
});

// db.close( (err) => {
// 	if (err){
// 		console.error(err.message);
// 	}
// 	console.log('Close the database connection');
// });

module.exports = router;