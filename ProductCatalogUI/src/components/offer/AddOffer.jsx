import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddOffer = (props) => {
  const [buyItNowPrice, setbuyItNowPrice] = useState(props.price);
  const { productId } = useParams();
  const offerStatus = 0;
  const [offer, setOffer] = useState('');
  const [percentage, setPercentage] = useState('');
  const [isPercentageActive, setIsPercentageActive] = useState(true);

  const userId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedOffer = isPercentageActive
      ? parseFloat(buyItNowPrice) * (parseFloat(percentage) / 100)
      : parseFloat(offer);
    axios
      .post(
        'https://localhost:7234/api/Offers',
        {
          userId,
          productId,
          offeredPrice: calculatedOffer,
          offerStatus,
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'accept': '*/*',
          },
        }
      )
      .then((response) => {
        setOffer('');
        setPercentage('');
        console.log('İstek başarılı:', response.data);
      })
      .catch((error) => {
        console.error('İstek hatası:', error);
      });
  };

  const handlePercentageChange = (e) => {
    setPercentage(e.target.value);
    const calculatedOffer = parseFloat(buyItNowPrice) * (parseFloat(e.target.value) / 100);
    setOffer(calculatedOffer.toFixed(2));
  };

  const handleOfferChange = (e) => {
    setOffer(e.target.value);
  };

  const handleOptionChange = (e) => {
    const isPercentageSelected = e.target.value === 'percentage';
    setIsPercentageActive(isPercentageSelected);
    if (isPercentageSelected) {
      setPercentage('');
      setOffer('');
    } else {
      setOffer('');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="offerOption" className="block text-gray-700 text-sm font-bold mb-2">
            Teklif Seçeneği
          </label>
          <select
            id="offerOption"
            name="offerOption"
            value={isPercentageActive ? 'percentage' : 'amount'}
            onChange={handleOptionChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="percentage">Yüzdelik</option>
            <option value="amount">Tutar</option>
          </select>
        </div>
        {isPercentageActive ? (
          <div className="mb-4">
            <label htmlFor="offerPercentage" className="block text-gray-700 text-sm font-bold mb-2">
              Yüzdelik Teklif
            </label>
            <input
              id="offerPercentage"
              name="offerPercentage"
              type="number"
              step="0.01"
              placeholder="Yüzdelik Teklifi Giriniz"
              value={percentage}
              onChange={handlePercentageChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ) : (
          <div className="mb-4">
            <label htmlFor="offerAmount" className="block text-gray-700 text-sm font-bold mb-2">
              Teklif Tutarı
            </label>
            <input
              id="offerAmount"
              name="offerAmount"
              type="number"
              step="0.01"
              placeholder="Teklif Tutarını Giriniz"
              value={offer}
              onChange={handleOfferChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Teklif Ver
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOffer;
