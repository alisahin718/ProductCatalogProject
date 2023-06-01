import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function HistoryTable(props) {
    const [caseHistoryData, setCaseHistoryData] = useState(null);
    const fetchData = async () => {
      const url = props.url;      
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
        setCaseHistoryData(data);
      } catch (error) {
        console.error("İstek hatası:", error);
      }
    };



  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">{props.tableName}</h1>
      {caseHistoryData ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Ürün Kodu</th>
              <th className="py-2 px-4 border-b">Ürün Adı</th>
              <th className="py-2 px-4 border-b">Satıcı</th>
              <th className="py-2 px-4 border-b">Alıcı</th>
              <th className="py-2 px-4 border-b">Fiyat</th>
              <th className="py-2 px-4 border-b">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {caseHistoryData.map((data) => (
              <tr key={data.id}>
                <td className="py-2 px-4 border-b">{data.id}</td>
                <td className="py-2 px-4 border-b">{data.productName}</td>
                <td className="py-2 px-4 border-b">{data.sellerName}</td>
                <td className="py-2 px-4 border-b">{data.buyerName}</td>
                <td className="py-2 px-4 border-b">{data.soldPrice}</td>
                <td className="py-2 px-4 border-b">{data.casedDate}</td>

                
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

export default HistoryTable;
