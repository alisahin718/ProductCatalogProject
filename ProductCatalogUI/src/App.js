import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/login.js';
import Register from './views/register.js';
import Menu from './components/Menu.jsx';
import CategoryPage from './views/CategoryPage.js';
import Home from './views/Home.js';
import BrandPage from './views/BrandPage.js';
import GirisHomePage from './views/GirisHomePage.js';
import UrunlerPage from './views/UrunlerPage.js';
import Deneme from './views/deneme.jsx';
import ProductDetails from './views/ProductDetails.js';
import OffersPage from './views/OffersPage.js';
import CaseHistoryPage from './views/CaseHistoryPage.js';




function App() {


  return (
    <div className="App">

      <BrowserRouter>
      <Menu/>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path='/girisHomePage' element={<GirisHomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/brand" element={<BrandPage />} />
          <Route path="/products" element={<UrunlerPage />} />
          <Route path="/deneme" element = {<Deneme/>} />
          <Route path="/productDetails/:productId" element = {<ProductDetails/>} />
          <Route path="/offers" element = {<OffersPage />} />
          <Route path="/caseHistory" element = {<CaseHistoryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
