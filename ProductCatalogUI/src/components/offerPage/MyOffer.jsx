import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function MyOffer() {
  const [offerData, setOfferData] = useState(null);
  const fetchData = async () => {
    const url = "https://localhost:7234/api/myOffers";
    const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;

    try {
      const response = await axios.post(url, localStorage.getItem("userId"), {
        headers: {
          Accept: "*/*",
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });

      console.log("İstek başarılı:", response.data);
      let data = response.data;
      setOfferData(data);
    } catch (error) {
      console.error("İstek hatası:", error);
    }
  };

  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  };

  const handleWithdraw = (id) => {
    axios
      .delete(`https://localhost:7234/api/Offers/${id}`, {
        headers,
      })
      .then((response) => fetchData())
      .catch((error) => console.log(error));
  };

  const handleBuyWithOffer = (id) => {
    axios
      .post("https://localhost:7234/api/Products/BuyWithOffer", id, { headers })
      .then((response) => {
        debugger;
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Verdiğim Teklifler</h1>
      {offerData ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Teklif Fiyatı</th>
              <th className="py-2 px-4 border-b">Durum</th>
              <th className="py-2 px-4 border-b">Fiyat</th>
              <th className="py-2 px-4 border-b">Ürün İsmi</th>
              <th className="py-2 px-4 border-b">Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            {offerData.map((offer) => (
              <tr key={offer.id}>
                <td className="py-2 px-4 border-b">{offer.offeredPrice}</td>
                <td className="py-2 px-4 border-b">
                  {offer.offerStatus === 0 ? "Beklemede" : offer.offerStatus}
                </td>
                <td className="py-2 px-4 border-b">{offer.currentPrice}</td>
                <td className="py-2 px-4 border-b">{offer.productName}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleWithdraw(offer.id)}
                  >
                    Geri Çek
                  </button>
                  {offer.offerStatus === 1 ? (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleBuyWithOffer(offer.id)}
                    >
                      Satın Al
                    </button>
                  ) : null}
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

export default MyOffer;
