import React, {useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import "./Items.css";

const Items = ({ items, stock, setStock }) => {
	let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

	// const [show, setShow] = useState(false);

	// const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);


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

	const handleEdit = (id) => {
	}

	return (
		<>

			<ol >
			{ items.map( ic => {
				return (
					<li className="list">
					{`${ic.flavor} - ${ic.brand}`}
					<button className="delete-button" onClick={ () => handleDelete(ic.id)} > Delete </button>
					<button className="edit-button" onClick={openModal}> Edit </button>
					</li>
				);
			}) }
			</ol>

			<Modal
			isOpen={modalIsOpen}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			// style={customStyles}
			contentLabel="Example Modal"
			>
			<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
			<button onClick={closeModal}>close</button>
			<div>I am a modal</div>
			<form>
				<input />
				<button>tab navigation</button>
				<button>stays</button>
				<button>inside</button>
				<button>the modal</button>
			</form>
			</Modal>

		</>
	)
}

export default Items;