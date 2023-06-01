import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddOfferButton from '../components/offer/AddOfferButton';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:7234/api/Products/${productId}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
        });

        if (response.status === 200) {
          setProduct(response.data);
        } else {
          console.log('İstek başarısız oldu.');
        }
      } catch (error) {
        console.log('İstek hatası:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBuyNow = async () => {
    // Satın alma işlemi
    try {
      // Satın alma isteği gönderme
      const response = await axios.post(
        `https://localhost:7234/api/Products/${productId}`,
        {
          
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
        }
      );

      if (response.status === 200) {
        // Satın alma işlemi başarılı, gerekli işlemler yapılabilir
        console.log('Satın alma işlemi başarılı.');
      } else {
        console.log('Satın alma işlemi başarısız oldu.');
      }
    } catch (error) {
      console.log('Satın alma hatası:', error);
    }
  };

  return (

    <div className="max-w-4xl mx-auto h-screen">
      
      <h2 className="text-3xl font-semibold mb-8">{product && product.name}</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={product && product.pictureUrl}
          alt={product && product.name}
          className="w-96 h-96 mx-auto object-cover"
        />
        <div className="p-4">
          <p className="text-gray-500 mb-2">{product && product.description}</p>
          <p className="text-gray-700 font-semibold">{product && product.buyItNowPrice} TL</p>
          {product && product.isOfferable ? (
            <AddOfferButton price={product.buyItNowPrice} />
          ) : (
            <button className="text-white py-1 px-4 rounded-md bg-gray-500 cursor-not-allowed" disabled>
              Teklife Kapalı
            </button>
          )}
          {product && product.isSold ? (
            <button
              className="text-white py-1 px-4 rounded-md bg-gray-500 cursor-not-allowed ml-4"
              disabled
            >
              Satın Al
            </button>
          ) : (
            <button
              className="text-white py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-4"
              onClick={handleBuyNow}
            >
              Satın Al
            </button>
          )}
          {product && product.isSold && <span className="text-red-500 ml-4">Satıldı</span>}
        </div>
      </div>
    </div>

  );
};

export default ProductDetails;
