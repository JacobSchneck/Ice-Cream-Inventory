import React from 'react';
import axios from 'axios';

const Items = ({ items, stock, setStock }) => {

	const onDelete = (id) => {
		console.log(id);
		axios.delete(`http://localhost:5000/id/${id}`)
		.then( res => {
			const index = items.findIndex( ic => ic.id === id);
			if (index === -1) {
				console.log("error");
			} else {
				stock.splice(index, 1);
				console.log(stock);
				setStock([...stock]);
			}
			console.log(res);
		})
		.catch( err => {
			console.log(err);
		});

	}

	return (
		<ol>
		{ items.map( ic => {
			return (
				<li>
				{`${ic.flavor} - ${ic.brand}`}
				<button className="delete-button" onClick={ () => onDelete(ic.id)} > Delete </button>
				</li>
			);
		}) }
		</ol>
	)
}

export default Items;