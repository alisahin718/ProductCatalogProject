import React, { useState, useEffect } from 'react';
import BrandList from '../components/brand/BrandList';
import AddBrandButton from '../components/brand/AddBrandButton';
import Menu from '../components/Menu';

function BrandPage() {


  return (
    
    <div className="flex flex-col">
     
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <AddBrandButton />
          <BrandList />
        </div>
      </div>
    </div>
  );
}

export default BrandPage;
