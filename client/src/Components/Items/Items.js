import React, {useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import "./Items.css";

const Items = ({ items, stock, setStock }) => {
// 	let subtitle;
//   const [modalIsOpen, setIsOpen] = React.useState(false);

//   function openModal() {
//     setIsOpen(true);
//   }

//   function afterOpenModal() {
//     // references are now sync'd and can be accessed.
//     subtitle.style.color = '#f00';
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

	const [show, setShow] = useState(false);
	const [flavor, setFlavor] = useState('');
	const [brand, setBrand] = useState('')
	const [id, setId] = useState();

	const handleClose = () => setShow(false);
	const handleShow = (id) => {
		setId(id);
		setShow(true);
	}


	const handleDelete = (id) => {
		console.log(id);
		axios.delete(`http://localhost:5000/id/${id}`)
		.then( res => {
			const index = stock.findIndex( ic => ic.id === id);
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

	const sendEdit = (event) => {
		const replacement = {
			id: id,
			flavor: flavor,
			brand: brand,
		};

		console.log(replacement);

		event.preventDefault();
		axios.put(`http://localhost:5000/id/${id}`, replacement)
			.then( res => {
				const index = stock.findIndex( ic => ic.id === id);
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
			{ items.map( ic => {
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