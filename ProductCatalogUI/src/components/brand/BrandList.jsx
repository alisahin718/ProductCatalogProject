import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BrandList = () => {
  const [brandies, setBrandies] = useState([]);
  const [editBrand, setEditBrand] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteBrandId, setDeleteBrandId] = useState(null);

  useEffect(() => {
    axios
      .get('https://localhost:7234/api/Brands', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        },
        params: {
          UserId: 1,
          PageNumber: 1,
          PageSize: 10
        }
      })
      .then((response) => {
        debugger;
        if (response.status === 200) {
          setBrandies(response.data.data);
        } else {
          console.log('İstek başarısız oldu.');
        }
      })
      .catch((error) => {
        console.log('İstek hatası:', error);
      });
  }, []);

  const handleEdit = (brand) => {
    setEditBrand(brand);
    setShowEditPopup(true);
  };

  const handleDelete = (brandId) => {
    setDeleteBrandId(brandId);
    setShowDeletePopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
  };

  const deleteBrand = () => {
    axios
      .delete(`https://localhost:7234/api/Brands/${deleteBrandId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
      .then((response) => {
        console.log('Marka silindi:', response.data);
        setBrandies(brandies.filter((brand) => brand.id !== deleteBrandId));
        setShowDeletePopup(false);
        toast.success('Kategori başarıyla silindi');
      })
      .catch((error) => {
        console.error('Silme hatası:', error);
      });
  };

  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
            >
              İsim
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
            >
              Açıklama
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
            >
              Düzenle
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
            >
              Sil
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {brandies && brandies.length > 0 ? (
            brandies.map((brand) => (
              <tr key={brand.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {brand.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {brand.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {brand.description}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(brand)}
                  >
                    Düzenle
                  </button>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(brand.id)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-800" colSpan="5">
                Marka bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showEditPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          {/* Düzenleme Pop-up içeriği */}
        </div>
      )}
      {showDeletePopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">Silmeyi Onayla</h2>
            <p>Bu markayı silmek istediğinizden emin misiniz?</p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={closeDeletePopup}
              >
                İptal
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={deleteBrand}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandList;
