import React from 'react';
import Menu from '../components/Menu';
import AddProductButton from '../components/products/AddProductButton';
import ProductsList from '../components/products/ProductsList';

function UrunlerPage() {


  return (

    <div className="flex flex-col">
    
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <AddProductButton />
          <ProductsList />
        </div>
      </div>
    </div>
  );
}

export default UrunlerPage;
