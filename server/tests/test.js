const request = require('supertest');
const app = require('../App');
const assert = require('assert');

describe('Integration Test for Back End Restful APIs', () => {
	describe('GET all from /', () => {
		it('Should return all Icecream in Inventory', (done) => {
			request(app)
				.get('/')
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) return done();
					const data = res.body;
					assert( JSON.stringify(data) === JSON.stringify([ 
						{ id: 1, flavor: 'Chocolate', brand: 'NadaMoo' },
  						{ id: 2, flavor: 'Strawberry', brand: 'Hudsonville' },
 						{ id: 3, flavor: 'Pistacio', brand: 'Haagen-Dazs' },
  						{ id: 4, flavor: 'Chunky Monkey', brand: 'Ben and Jerry\'s' } 
					]), "GET all does not functions properly");
					return done();
				});
			});
		});

	describe('GET icecream from /id/:id', () => {
		it('Should return Icecream matching id', (done) => {
			request(app)
				.get(`/id/${3}`)
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) return done();
					const data = res.body;
					assert( JSON.stringify(data) === JSON.stringify([ 
 						{ id: 3, flavor: 'Pistacio', brand: 'Haagen-Dazs' },
					]), "GET id  does not function properly"); 
					return done();
			});
		});
	});

	describe('GET icecream from /flavor/:flavor', () => {
		it('Should return Icecream matching flavor', (done) => {
			request(app)
				.get('/flavor/Pistacio')
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) return done();
					const data = res.body;
					assert( JSON.stringify(data) === JSON.stringify([ 
 						{ id: 3, flavor: 'Pistacio', brand: 'Haagen-Dazs' },
					]), "GET flavor does not function properly");
					return done();
			});
		});
	});
	
	describe('GET icecream from /brand/:brand', () => {
		it('Should return Icecream matching brand', (done) => {
			request(app)
				.get('/brand/Haagen-Dazs')
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) return done();
					const data = res.body;
					assert( JSON.stringify(data) === JSON.stringify([ 
 						{ id: 3, flavor: 'Pistacio', brand: 'Haagen-Dazs' },
					]), "GET brand does not function properly");
					return done();
			});
		});
	});

	describe("Post {id: 5, flavor: 'Peach', brand: 'Store Brand' to database", () => {
		it('Should add peach icecream to the database', (done) => {
			request(app)
				.post('/')
				.set('Accept', 'application/json')
				.send({id: 5, flavor: 'Peach', brand: 'Store Brand'})
				.expect(200)
				.end((err, res) => {
					if (err) return done();
					const data = res.body.message;
					assert('{"id":5,"flavor":"Peach","brand":"Store Brand"} inserted' === data, "Post does not function properly");
					return done();
			});
		});
	});

	describe("Put at id 5 -> {id: 5, flavor: 'Banana', brand: 'Edy\'s' to database", () => {
		it('Should add peach icecream to the database', (done) => {
			request(app)
				.put(`/id/${5}`)
				.set('Accept', 'application/json')
				.send({id: 5, flavor: 'Banana', brand: 'Edy\'s'})
				.expect(200)
				.end((err, res) => {
					if (err) return done();
					const data = res.body.message;
					assert(`Icecream with id = ${5} changed to Banana - Edy\'s` === data, "Put does not function properly");
					return done();
			});
		});
	});

	describe('GET icecream from /id/:id', () => {
		it('Should return Icecream matching id', (done) => {
			request(app)
				.get(`/id/${5}`)
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) return done();
					const data = res.body;
					assert( JSON.stringify(data) === JSON.stringify([ 
 						{ id: 5, flavor: 'Banana', brand: 'Edy\'s'},
					]), "GET id  does not function properly"); 
					return done();
			});
		});
	});

	describe("DELETE mathcing id's from database", () => {
		it('Should delete peach icecream', (done) => {
			request(app)
				.delete(`/id/${5}`)
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) return done();
					const data = res.body.message;
					assert('Icecream with id = 5 deleted' === data, "Post does not function properly");
					return done();
			});
		});
	});
});


app.close();