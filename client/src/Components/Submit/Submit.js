import React, { useState} from 'react';
import axios from 'axios';

import Items from '../Items/Items';

import "./Submit.css";

const Submit = ({ stock, setStock }) => {
  const [flavor, setFlavor] = useState('');
  const [brand, setBrand] = useState('');

  const submitIceCream = (event) => {
		event.preventDefault();
		const id = Math.max(...stock.map( el => el.id)) + 1;
		const icecream = {
		id: id,
		flavor: flavor,
		brand: brand,
		};



		axios.post('http://localhost:5000', icecream)
			.then( (res) => {
				console.log(res);
				// const newStock = stock.slice().push(icecream);
				setStock([...stock, icecream]);
			})
			.catch( (error) => {
				console.log(error);
			});
	
		console.log(stock);
	}

	return (
		<div>
			<form className="ice-cream-form">
			<div>
				<input type="text" placeholder="flavor" onChange={(event) => setFlavor(event.target.value)} />
			</div>
			<div>
				<input type="text" placeholder="brand" onChange={(event) => setBrand(event.target.value)} />
			</div>
			<input type="submit" value="SUBMIT" onClick={(event) => submitIceCream(event)}/>
			</form>
			< Items items={ stock } stock={stock} setStock={ setStock } />
		</div>
	);
}

export default Submit;