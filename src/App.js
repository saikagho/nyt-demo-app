import React from 'react';
import './App.css';

import Header from './Components/Header/header'
import Main from './Components/Main/main'
//import Footer from './Components/Footer/footer'

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Main/>
      {/*<Footer/>*/}
    </div>
  );
}

export default App;
