// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './layout/Layout'

import Home from './components/Home'
import News from './components/News';
import Exchanges from './components/Exchanges';
import Cyrptocurrencies from './components/Cyrptocurrencies'
import Cryptodetails from './components/Cryptodetails'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 

          <Route path="news" element={<News />} /> 
          <Route path="exchanges" element={<Exchanges />} /> 
          <Route path="cyrptocurrencies" element={<Cyrptocurrencies />} /> 
          <Route path="cryptodetails" element={<Cryptodetails />} /> 

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
