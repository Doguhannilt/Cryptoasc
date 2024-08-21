import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllAssetsQuery } from '../redux-services/cryptoascApi';
import { selectCoin } from '../redux-services/slices/coinSlice';
import { FaCoins } from "react-icons/fa6";
import Modal from './Modal'; 

const Filters = () => {
    const dispatch = useDispatch();
    const { data: assetsData, isFetching, error } = useGetAllAssetsQuery();
    const [filter, setFilter] = useState('lowestRank'); // Default filter

    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (asset) => {
      dispatch(selectCoin(asset));
      setShowModal(true); // Modalı aç
    };

    if (isFetching) return <div className="text-center text-gray-400">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    // Sort assets based on the selected filter
    const sortedAssets = [...assetsData?.data].sort((a, b) => {
        switch (filter) {
            case 'lowestRank':
                return a.rank - b.rank; // Sort by rank (lowest first)
            case 'highestPrice':
                return b.priceUsd - a.priceUsd; // Sort by price (highest first)
            case 'highestMarketCap':
                return b.marketCapUsd - a.marketCapUsd; // Sort by market cap (highest first)
            case 'highestVolume':
                return b.volumeUsd24Hr - a.volumeUsd24Hr; // Sort by 24h volume (highest first)
            case 'lowestPrice':
                return a.priceUsd - b.priceUsd; // Sort by price (lowest first)
            default:
                return 0;
        }
    });

    // Get the top 10 assets
    const topAssets = sortedAssets.slice(0,8);

    return (
        <div className="bg-gray-900 min-h-screen py-8">

            <div className="container mx-auto px-4 ">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">
                    {filter === 'lowestRank' && 'Lowest Rank Assets'}
                    {filter === 'highestPrice' && 'Highest Price Assets'}
                    {filter === 'highestMarketCap' && 'Highest Market Cap Assets'}
                    {filter === 'highestVolume' && 'Highest Volume Assets'}
                    {filter === 'lowestPrice' && 'Lowest Price Assets'}
                </h1>

                {/* Filter Buttons */}
                <div className="mb-8 text-center ">
                    <button
                        onClick={() => setFilter('lowestRank')}
                        className={`px-4 py-2 hover:scale-110 duration-300  rounded-lg ${filter === 'lowestRank' ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300'}`}
                    >
                        Lowest Rank
                    </button>
                    <button
                        onClick={() => setFilter('highestPrice')}
                        className={`ml-4 px-4 py-2 hover:scale-110 duration-300 rounded-lg ${filter === 'highestPrice' ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300'}`}
                    >
                        Highest Price
                    </button>
                    <button
                        onClick={() => setFilter('highestMarketCap')}
                        className={`ml-4 px-4 py-2 hover:scale-110 duration-300 rounded-lg ${filter === 'highestMarketCap' ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300'}`}
                    >
                        Highest Market Cap
                    </button>
                    <button
                        onClick={() => setFilter('highestVolume')}
                        className={`ml-4 px-4 py-2 hover:scale-110 duration-300 rounded-lg ${filter === 'highestVolume' ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300'}`}
                    >
                        Highest Volume
                    </button>
                    <button
                        onClick={() => setFilter('lowestPrice')}
                        className={`ml-4 px-4 py-2 hover:scale-110 duration-300 rounded-lg ${filter === 'lowestPrice' ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300'}`}
                    >
                        Lowest Price
                    </button>
                </div>
                <div id="alert-additional-content-1" class="p-4 mb-4 text-blue-800 border border-gray-600 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-gray-800" role="alert">
                <div class="flex items-center">
                    <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                        <span class="sr-only">Info</span>
                        <div className="flex">
                            <h3 class="text-lg font-medium">You can filter the assets by rank, price, market cap, and 24h volume </h3>
                            <FaCoins size={20} className="ml-2 mt-1"/>
                        </div>

                </div>
            </div>
                {/* Filtered Assets */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {topAssets.map((asset) => (
                        <div
                            key={asset.id}
                            className="bg-gray-800 shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 p-6"
                            onClick={() => handleCardClick(asset)} // Dispatch the selected coin
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
            </div>
            {showModal && <Modal showModal={showModal} toggleModal={() => setShowModal(false)} />}
        </div>
    );
};

export default Filters;
