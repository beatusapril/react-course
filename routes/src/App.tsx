import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Main } from './components/Main';
import { Profile } from './components/Profile';

function App() {
  return (
    <div className="App">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/main">Main</Link></li>
        < li><Link to="/profile">Profile</Link></li>
      </ul>
      <React.Fragment>
        <Routes>
          <Route path='/' ></Route>
          <Route path='/main' element={<Main/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
