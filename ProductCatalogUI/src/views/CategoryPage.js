import React from 'react';
import CategoryList from '../components/category/CategoryList';
import AddCategoryButton from '../components/category/AddCategoryButton';
import Menu from '../components/Menu';

function CategoryPage() {


  return (

    <div className="flex flex-col">
   
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <AddCategoryButton />
          <CategoryList />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
