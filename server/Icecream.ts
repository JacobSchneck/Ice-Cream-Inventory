// const express = require('express');
import * as express from "express";
// import  sqlite3  from 'sqlite3';
// sqlite3.verbose();
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

//--------------------- OPEN DATA BASE --------------------------
const args = process.argv;	
const dataBasePath = args[2] === "tests/test.js" ? "./db/mock.db" : "./db/icecream.db";
console.log("Database path: " + dataBasePath); // print to console
let db = new sqlite3.Database(dataBasePath, (err) => {
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


//--------------------- GET -------------------------------------
router.get('/', (req, res) => {
	const sql = " SELECT * FROM icecream";
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
	const sql = ` SELECT * FROM icecream WHERE id = ${id}`;
	db.all(sql, [], (err, result) => {
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

//--------------------- POST-------------------------------------
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
	})
	res.json({message: `${JSON.stringify(icecream)} inserted`});
});

//--------------------- DELETE ----------------------------------
router.delete('/id/:id', (req, res) => {
	const { id } = req.params;
	const sql = `DELETE FROM icecream WHERE id = ${id}`;
	db.all(sql, [], (err, result) => {
		if (err) {
			throw err;
		}
	});
	res.json({message: `Icecream with id = ${id} deleted`});
});

//--------------------- PUT -------------------------------------
router.put('/id/:id', (req, res) => {
	const { id, flavor, brand} = req.body; 
	const sql = `UPDATE icecream
					 SET 
					 	flavor = ?,
						brand = ?
					WHERE id = ?`;
	db.run(sql, [flavor, brand, id], (err, result) => {
		if (err) {
			return console.error(err.message);
		}
	});
	res.json({message: `Icecream with id = ${id} changed to ${flavor} - ${brand}`});
});

module.exports = router;
