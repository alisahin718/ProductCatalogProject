import React from 'react';

const GirisHomePage = () => {




    return (
        <div className='flex flex-col'>
            <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Ürün Katalogu Projesi</h1>
                <p className="text-lg text-gray-700 mb-8">Hoş geldiniz. Giriş yaptınız, istediğiniz sayfaya üst menüden gidebilirsiniz.</p>
                <div className="flex space-x-4">
                    {/* İstediğiniz butonları buraya ekleyebilir ve handleRegisterClick, handleLoginClick fonksiyonlarını kullanabilirsiniz */}
                </div>
            </div>
        </div>
    );
};

export default GirisHomePage;