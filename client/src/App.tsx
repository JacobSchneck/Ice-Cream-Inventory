import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Submit from "./Components/Submit/Submit";
import Request from "./Components/Request/Request";

import StockType from './Types/StockType';

import "./App.css"

const App = () => {
  const [stock, setStock] = useState<Array<StockType>>([]);

  useEffect( () => {
    axios.get('http://localhost:5000')
      .then( (res) => {
        let data = res.data;
        data = data.map( (el: StockType) => {
          return { id: el.id, flavor: el.flavor, brand: el.brand }
        });
        console.log(data);
        setStock(data);
      })
      .catch( (error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="App">
      <header className="header">
        <h1>
          Ice Cream Form
        </h1>
      </header>
      <div className="lists">
        <div>
          <h3 className="header"> 
            {"Submit to Inventory"}
          </h3>
          <Submit stock={stock} setStock={setStock} />
        </div>
        <div>
          <h3 className="header">
            Request from Inventory
          </h3>
          <Request stock={stock} setStock={setStock} />
        </div>
      </div>
  </div>
  )
}

export default App;
