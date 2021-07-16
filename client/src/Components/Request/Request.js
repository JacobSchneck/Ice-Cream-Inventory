import React, { useCallback, useState } from 'react';
import axios from 'axios';

import './Request.css';

const Request = ({ stock }) => {
	const [flavor, setFlavor] = useState('');
	const [brand, setBrand] = useState('');
	const [matches, setMatches] = useState([]);

	const getIceCream = (event) => {
		event.preventDefault();
		console.log(stock);
		const arr = stock.filter( ic => ic.flavor === "Chocolate" && ic.brand === "NadaMoo");
		console.log(arr);
		setMatches(stock.filter( ic => ic.flavor === flavor && ic.brand === brand ));
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
			<input type="submit" value="REQUEST" onClick={(event) => getIceCream(event)} />
			</form>
			<ol>
			{ matches.map( ic => {
				return (
					<li>
					{`${ic.flavor} - ${ic.brand}`}
					</li>
				);
			}) }
			</ol>
		</div>
  );
}

export default Request;