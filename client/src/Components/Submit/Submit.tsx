import React, { useState} from 'react';
import axios from 'axios';

import Items from '../Items/Items';

import "./Submit.css";
import StockType from '../../Types/StockType';

interface SubmitProps {
	stock: StockType[],
	setStock: (stock: StockType[]) => void,
}

const Submit: React.FC<SubmitProps> = ({ stock, setStock }) => {
  const [flavor, setFlavor] = useState<string>('');
  const [brand, setBrand] = useState<string>('');

  // Any seems fine for event
  const submitIceCream = (event: any) => {
		event.preventDefault();
		const id = Math.max(...stock.map( (el: StockType) => el.id)) + 1;
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