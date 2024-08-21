import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from './Modal'; 
const AllAssets = ({ assetsData, dispatch, selectCoin, }) => {

    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (asset) => {
      dispatch(selectCoin(asset));
      setShowModal(true); // Modalı aç
    };


    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 mt-10 text-center text-white">All Assets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {assetsData?.data.map((asset) => (
                    <div
                    onClick={() => handleCardClick(asset)} 
                        key={asset.id}
                        className="bg-gray-800 shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 p-6"
                       >
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-white">{asset.name}</h2>
                            <p className="text-gray-400">{asset.symbol}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-300">Price:</p>
                            <p className="text-2xl font-bold text-white">${asset.priceUsd}</p>
                            <p className="text-gray-300 mt-2">Market Cap:</p>
                            <p className="text-xl font-bold text-white">
                                {asset.marketCapUsd ? `$${parseFloat(asset.marketCapUsd).toLocaleString()}` : 'N/A'}
                            </p>
                            <p className="text-gray-300 mt-2">24h Volume:</p>
                            <p className="text-xl font-bold text-white">
                                {asset.volumeUsd24Hr ? `$${parseFloat(asset.volumeUsd24Hr).toLocaleString()}` : 'N/A'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && <Modal showModal={showModal} toggleModal={() => setShowModal(false)} />}
        </div>
    )
}

export default AllAssets