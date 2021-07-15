import React, { useState } from 'react';
import "./App.css"

const App = () => {
  const [flavor, setFlavor] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState([]);

  const submitIceCream = (event) => {
    event.preventDefault();
    const icecream = {
      flavor: flavor,
      brand: brand,
    };
    setStock([...stock, icecream]);
  }

  return (
    <div className="App">
      <header className="header">
        <h1>
          Ice Cream Form
        </h1>
      </header>
      <form className="ice-cream-form">
        <div>
          <input type="text" placeholder="flavor" onChange={(event) => setFlavor(event.target.value)} />
        </div>
        <div>
          <input type="text" placeholder="brand" onChange={(event) => setBrand(event.target.value)} />
        </div>
        <input type="submit" value="submit" onClick={(event) => submitIceCream(event)}/>
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
  )
}

export default App;
