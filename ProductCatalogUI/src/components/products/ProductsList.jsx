import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const location = useLocation();

  useEffect(() => {
    axios
      .get('https://localhost:7234/api/products', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        },
        params: {
          UserId: 1,
          CategoryId: selectedCategoryId
        }
      })
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.data);
        } else {
          console.log('İstek başarısız oldu.');
        }
      })
      .catch((error) => {
        console.log('İstek hatası:', error);
      });
  }, [selectedCategoryId]);

  useEffect(() => {
    axios
      .get('https://localhost:7234/api/categories', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        },
        params: {
          UserId: 1
        }
      })
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data.data);
        } else {
          console.log('İstek başarısız oldu.');
        }
      })
      .catch((error) => {
        console.log('İstek hatası:', error);
      });
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryId = searchParams.get('category');
    setSelectedCategoryId(categoryId || '');
  }, [location.search]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex mb-4">
        <Link
          to="/products"
          className={`mr-4 font-semibold ${
            selectedCategoryId === '' ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
          }`}
        >
          Tüm Ürünler
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/products?category=${category.id}`}
            className={`mr-4 font-semibold ${
              selectedCategoryId === category.id ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
          >
            <img src={product.pictureUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500 mb-2">Satıcı: {product.owner}</p>
              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-semibold">{product.buyItNowPrice} TL</p>
                <Link
                  to={`/productDetails/${product.id}`}
                  className="text-white py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Detaylar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
