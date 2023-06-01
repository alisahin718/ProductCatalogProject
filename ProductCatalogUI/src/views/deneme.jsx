import React from 'react';

const ProductList = () => {
  const products = [
    {
      id: 6,
      name: 'Iphone 13',
      description: 'Hatasız Telefon',
      pictureUrl: 'string',
      buyItNowPrice: 25000,
      isOfferable: true,
      isSold: false,
      conditionStatus: 'Sıfır',
      owner: 'deneme1',
      userId: '1',
      colorName: 'Beyaz',
      brandName: 'Apple',
      categoryName: 'Elektronik',
    },
    {
      id: 7,
      name: 'Samsung Galaxy S21',
      description: 'Güçlü performans',
      pictureUrl: 'string',
      buyItNowPrice: 20000,
      isOfferable: false,
      isSold: true,
      conditionStatus: 'İyi',
      owner: 'deneme2',
      userId: '2',
      colorName: 'Siyah',
      brandName: 'Samsung',
      categoryName: 'Elektronik',
    },
    {
      id: 8,
      name: 'Sony PlayStation 5',
      description: 'Yeni nesil oyun deneyimi',
      pictureUrl: 'string',
      buyItNowPrice: 3500,
      isOfferable: true,
      isSold: false,
      conditionStatus: 'Sıfır',
      owner: 'deneme3',
      userId: '3',
      colorName: 'Beyaz',
      brandName: 'Sony',
      categoryName: 'Oyun Konsolu',
    },
    // Diğer ürünleri buraya ekleyin, gerektiğinde
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8">Ürün Listesi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
          >
            <img src={product.pictureUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500 mb-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-semibold">{product.buyItNowPrice} TL</p>
                <button className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
