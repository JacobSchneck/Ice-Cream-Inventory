import React, { useEffect, useState} from 'react';
import axios from 'axios';

import "./Submit.css";

const Submit = ({ stock, setStock }) => {
  const [flavor, setFlavor] = useState('');
  const [brand, setBrand] = useState('');

  const submitIceCream = (event) => {
    event.preventDefault();
    const icecream = {
      flavor: flavor,
      brand: brand,
    };

    axios.post('http://localhost:5000', icecream)
      .then( (res) => {
        console.log(res.data);
        setStock([...stock, res.data]);
      })
      .catch( (error) => {
        console.log(error);
      });
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
			<ol>
			{ stock.map( ic => {
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

export default Submit;