import React from 'react';
// import logo from './logo.svg'; don't need but for knowing how to get a logo

import Header from './components/Header'

function App() {
  return (
    <>
    <div className='container'>
       <Header /> 
      <h1>My App - Aviar</h1>
      <p>not all nav bar elements will be on the screen at same time</p>

    </div>
    </>
  );
}

export default App;
