import React from 'react';
import './App.css';
import data from './data.json';


function App() {
  return (
    <div className="App">
      {
      data.map(data => (
        <div className="boink">
          <h1>{data.name}</h1>
          <p>{data.adress}</p>
          <p>{data.locality}</p>
        </div>
      ))
      }
    </div>
  );
}

export default App;
