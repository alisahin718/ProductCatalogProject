import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [colors, setColors] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    isSold: false,
    isOfferable: false
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchColors();
    fetchConditions();
    fetchBrands();
    fetchCategories();
  }, []);

  const fetchColors = () => {
    axios
      .get('https://localhost:7234/api/Colors', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          Accept: 'application/json'
        },
        params: {
          UserId: 1
        }
      })
      .then((response) => {
        setColors(response.data.data);
      })
      .catch((error) => {
        console.error('Renkler alınırken hata oluştu:', error);
      });
  };

  const fetchConditions = () => {
    axios
      .get('https://localhost:7234/api/Conditions', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          Accept: 'application/json'
        },
        params: {
          UserId: 1
        }
      })
      .then((response) => {
        setConditions(response.data.data);
      })
      .catch((error) => {
        console.error('Durumlar alınırken hata oluştu:', error);
      });
  };

  const fetchBrands = () => {
    axios
      .get('https://localhost:7234/api/Brands', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          Accept: 'application/json'
        },
        params: {
          UserId: 1
        }
      })
      .then((response) => {
        setBrands(response.data.data);
      })
      .catch((error) => {
        console.error('Markalar alınırken hata oluştu:', error);
      });
  };

  const fetchCategories = () => {
    axios
      .get('https://localhost:7234/api/categories', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          Accept: 'application/json'
        },
        params: {
          UserId: 1
        }
      })
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error('Kategoriler alınırken hata oluştu:', error);
      });
  };

  const handleProductOnChange = (e) => {
    var value = null;

    switch (e.target.name) {
      case 'isSold':
      case 'isOfferable':
        value = e.target.checked;
        break;
      case 'buyItNowPrice':
      case 'conditionId':
      case 'colorId':
      case 'brandId':
      case 'categoryId':
        value = Number(e.target.value);
        break;
      default:
        value = e.target.value;
        break;
    }

    var tempProduct = { ...product, [e.target.name]: value };
    setProduct(tempProduct);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var data = { ...product, userId: localStorage.getItem('userId') };
    console.log(data);

    const headers = {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    };

    axios
      .post('https://localhost:7234/api/Products', data, { headers })
      .then((response) => {
        console.log('Ürün eklendi:', response.data);
        setProduct({});
        setShowPopup(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[400px] overflow-y-auto">
        <div>
          <label htmlFor="product-name" className="block font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="product-name"
            name='name'
            value={product.name}
            onChange={handleProductOnChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            name='buyItNowPrice'
            value={product.buyItNowPrice}
            onChange={handleProductOnChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name='description'
            value={product.description}
            onChange={handleProductOnChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            maxLength={500}
          />
        </div>
        <div>
          <label htmlFor="is-offerable" className="block font-medium">
            Is Offerable
          </label>
          <input
            type="checkbox"
            id="is-offerable"
            name='isOfferable'
            checked={product.isOfferable}
            onChange={handleProductOnChange}
          />
        </div>
        <div>
          <label htmlFor="is-sold" className="block font-medium">
            Is Sold
          </label>
          <input
            type="checkbox"
            id="is-sold"
            name='isSold'
            checked={product.isSold}
            onChange={handleProductOnChange}
          />
        </div>

        <div>
          <label htmlFor="image" className="block font-medium">
            Image
          </label>
          <input
            id="image"
            name='pictureUrl'
            onChange={handleProductOnChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="color" className="block font-medium">
            Color
          </label>
          <select
            id="color"
            name='colorId'
            onChange={handleProductOnChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option> Lütfen Seçiniz </option>
            {colors && colors.length > 0 ?
              colors.map(color => (
                
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              )) : null}
          </select>
        </div>
        <div>
          <label htmlFor="condition" className="block font-medium">
            Condition
          </label>
          <select
            id="condition"
            name='conditionId'
            onChange={handleProductOnChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option> Lütfen Seçiniz </option>
            {conditions && conditions.length > 0 ?
              conditions.map(condition => (
                <option key={condition.id} value={condition.id}>
                  {condition.status}
                </option>
              )) : null}
          </select>
        </div>
        <div>
          <label htmlFor="brand" className="block font-medium">
            Brand
          </label>
          <select
            id="brand"
            name='brandId'
            onChange={handleProductOnChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option> Lütfen Seçiniz </option>
            {brands && brands.length > 0 ? 
            brands.map(brand => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            )) : null}
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <select
            id="category"
            name='categoryId'
            onChange={handleProductOnChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option> Lütfen Seçiniz </option>
            {categories && categories.length > 0 ?
              categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )) : null}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
          Add
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Success</h3>
            <p>Product added successfully!</p>
            <button
              className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
