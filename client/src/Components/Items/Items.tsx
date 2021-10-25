import React, {useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import "./Items.css";
import StockType from "../../Types/StockType";

interface ItemsProps {
	items: StockType[],
	stock: StockType[],
	setStock: (stock: StockType[]) => void,
}

const Items: React.FC<ItemsProps> = ({ items, stock, setStock }) => {

	const [show, setShow] = useState<boolean>(false);
	const [flavor, setFlavor] = useState<string>('');
	const [brand, setBrand] = useState<string>('')
	const [id, setId] = useState<number>(-1);

	const handleClose = () => setShow(false);
	const handleShow = (id: number) => {
		setId(id);
		setShow(true);
	}


	const handleDelete = (id: number) => {
		console.log(id);
		axios.delete(`http://localhost:5000/id/${id}`)
		.then( res => {
			const index = stock.findIndex( (ic: StockType) => ic.id === id);
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

	const sendEdit = (event: any) => {
		const replacement = {
			id: id,
			flavor: flavor,
			brand: brand,
		};


		event.preventDefault();
		axios.put(`http://localhost:5000/id/${id}`, replacement)
			.then( res => {
				const index = stock.findIndex( (ic: StockType) => ic.id === id);
				if (index === -1) {
					console.log("error");
				} else {
					stock[index] = replacement;
					setStock([...stock]);
				}
			})
			.catch( err => {
				console.log(err.response.data);
			});
	}

	return (
		<>
			<ol >
				{ items.map( (ic: StockType) => {
					return (
						<li className="list">
							{`${ic.flavor} - ${ic.brand}`}
							<button className="delete-button" onClick={ () => handleDelete(ic.id)} > Delete </button>
							<button className="edit-button" onClick={ () => handleShow(ic.id)}> Edit </button>
						</li>
					);
				}) }
			</ol>

			<Modal
				isOpen={show}
				onRequestClose={handleClose}
				contentLabel="Example Modal"
				className="modal"
			>
			<form className="ice-cream-form">
			<div>
				<input type="text" placeholder="flavor" onChange={(event) => {
					setFlavor(event.target.value)
					console.log(flavor);
				}} 
				/>

			</div>
			<div>
				<input type="text" placeholder="brand" onChange={(event) => {
					setBrand(event.target.value)
					console.log(brand);
				}} 
				/>
			</div>
			<input type="submit" value="Submit Edit" onClick={(event) => sendEdit(event)}/>
			<button onClick={handleClose}>Close</button>
			</form>
			</Modal>

		</>
	)
}

export default Items;