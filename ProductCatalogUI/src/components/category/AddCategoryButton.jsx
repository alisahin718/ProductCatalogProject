import React, { useState } from 'react';
import AddCategory from './AddCategory';

const AddCategoryButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="flex justify-center items-center mt-4 mb-4">
      <button
        onClick={togglePopup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Yeni Kategori Ekle
      </button>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <AddCategory />
            <button
              onClick={togglePopup}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategoryButton;
