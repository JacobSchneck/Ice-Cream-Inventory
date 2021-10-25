import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import Items from "../Items/Items";
import StockType from '../../Types/StockType';

import './Request.css';

interface RequestProps {
	stock: StockType[],
	setStock: (stock: StockType[]) => void,
}

const Request: React.FC<RequestProps> = ({ stock, setStock }) => {
	const [flavor, setFlavor] = useState<string>('');
	const [brand, setBrand] = useState<string>('');
	const [matches, setMatches] = useState<Array<StockType>>(stock.filter( ic => ic.flavor === flavor && ic.brand === brand ));

	useEffect( () => {
		setMatches(stock.filter( (ic: StockType) => ic.flavor === flavor && ic.brand === brand ));
	}, [stock]);

	const getIceCream = (event: any) => {
		event.preventDefault();
		// console.log(stock);
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
			<Items items={matches} stock={stock} setStock={setStock} />
		</div>
  );
}

export default Request;