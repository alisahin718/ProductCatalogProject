import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function MyProductOffer() {
  const [offerData, setOfferData] = useState(null);

  const fetchData = async () => {
    const url = 'https://localhost:7234/api/myProducts';
    const accessToken = `Bearer ${localStorage.getItem('accessToken')}`;



    try {
      const response = await axios.post(
        url,
        localStorage.getItem('userId'),
        {
          headers: {
            'Accept': '*/*',
            'Authorization': accessToken,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('İstek başarılı:', response.data);
      setOfferData(response.data);
    } catch (error) {
      console.error('İstek hatası:', error);
    }
  };

  const handleAccept = (id,price) => {
    const urlOfferAccept = `https://localhost:7234/api/Offers/${id}`;

    axios.put(urlOfferAccept,{offerStatus:1,offeredPrice:price}, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    }).then(response => fetchData()).catch(error => console.log(error))
  }
  const handleReject = (id) => {


    axios.delete(`https://localhost:7234/api/Offers/${id}`, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    }).then(response => fetchData()).catch(error => console.log(error))
  }

  useEffect(() => {


    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Aldığım Teklifler</h1>
      {offerData ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Teklif Fiyatı</th>
              <th className="py-2 px-4 border-b">Durum</th>
              <th className="py-2 px-4 border-b">Fiyat</th>
              <th className="py-2 px-4 border-b">Ürün İsmi</th>
              <th className="py-2 px-4 border-b">Kullanıcı</th>
              <th className="py-2 px-4 border-b">Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            {offerData.map((offer) => (
              <tr key={offer.id}>
                <td className="py-2 px-4 border-b">{offer.offeredPrice}</td>
                <td className="py-2 px-4 border-b">
                  {offer.offerStatus === 0 ? "Beklemede" : 
                  offer.offerStatus === 1 ? "Kabul Edildi": 
                  offer.offerStatus === 2 ? "Reddedildi" : offer.offerStatus}</td>
                <td className="py-2 px-4 border-b">{offer.currentPrice}</td>
                <td className="py-2 px-4 border-b">{offer.productName}</td>
                <td className="py-2 px-4 border-b">{offer.userName}</td>
                <td className="py-2 px-4 border-b">
                  {offer.offerStatus === 0 ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                   
                    onClick={() => handleAccept(offer.id,offer.price)}>
                    Onayla
                  </button> :
                  <button className="bg-gray-500  text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                  disabled
                   onClick={() => handleAccept(offer.id,offer.price)}>
                   Onayla
                 </button> }
                  
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  disabled = {offer.offerStatus !== 0}
                    onClick={() => handleReject(offer.id)}>
                    Reddet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">Teklif bilgileri yükleniyor...</p>
      )}
    </div>
  );
}

export default MyProductOffer;
