import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    axios
      .get('https://localhost:7234/api/categories', {
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

  const handleEdit = (category) => {
    setEditCategory(category);
    setEditedName(category.name);
    setEditedDescription(category.description);
    setShowEditPopup(true);
  };

  const handleDelete = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setShowDeletePopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
  };

  const deleteCategory = () => {
    axios
      .delete(`https://localhost:7234/api/categories/${deleteCategoryId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
      .then((response) => {
        console.log('Kategori silindi:', response.data);
        setCategories(categories.filter((category) => category.id !== deleteCategoryId));
        setShowDeletePopup(false);
        toast.success('Kategori başarıyla silindi');
      })
      .catch((error) => {
        console.error('Silme hatası:', error);
      });
  };

  const updateCategory = () => {
    const updatedCategory = {
      ...editCategory,
      name: editedName,
      description: editedDescription
    };

    axios
      .put(`https://localhost:7234/api/categories/${editCategory.id}`, updatedCategory, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
      .then((response) => {
        console.log('Kategori güncellendi:', response.data);
        const updatedCategories = categories.map((category) =>
          category.id === editCategory.id ? response.data : category
        );
        setCategories(updatedCategories);
        setShowEditPopup(false);
        toast.success('Kategori başarıyla güncellendi');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Güncelleme hatası:', error);
      });
  };

  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Tablo başlıkları */}
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
        {/* Tablo içeriği */}
        <tbody className="divide-y divide-gray-200">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {category.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {category.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {category.description}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(category)}
                  >
                    Düzenle
                  </button>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(category.id)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-800" colSpan="5">
                Kategori bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Düzenleme popup */}
      {showEditPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">Kategoriyi Düzenle</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">İsim</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Açıklama</label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                onClick={updateCategory}
              >
                Kaydet
              </button>
              <button
                className="px-4 py-2 ml-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
                onClick={closeEditPopup}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Silme popup */}
      {showDeletePopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">Kategoriyi Sil</h2>
            <p className="text-sm text-gray-700 mb-4">
              Kategoriyi silmek istediğinizden emin misiniz?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={deleteCategory}
              >
                Sil
              </button>
              <button
                className="px-4 py-2 ml-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
                onClick={closeDeletePopup}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
