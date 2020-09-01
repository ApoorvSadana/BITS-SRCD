import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Deck from './components/Deck/Deck';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="DeckWrapper">
            <Sidebar />
            <Deck />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
