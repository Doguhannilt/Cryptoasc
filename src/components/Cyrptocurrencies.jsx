

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllAssetsQuery } from '../redux-services/cryptoascApi';
import { selectCoin } from '../redux-services/slices/coinSlice';
import AllAssets from './AllAssets';
import BestAssets from './BestAssets';
import Filters from './Filters';
import Modal from './Modal';

const Statistics = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('lowestRank'); 
  const [showModal, setShowModal] = useState(false);

  const { data: assetsData, isFetching, error } = useGetAllAssetsQuery();
  const selectedCoin = useSelector(state => state.coin.selectedCoin);

  if (isFetching) return <div className="text-center text-gray-400">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;


  const sortedAssets = [...assetsData?.data].sort((a, b) => {
    if (filter === 'lowestRank') {
      return a.rank - b.rank; 
    } else if (filter === 'highestPrice') {
      return b.priceUsd - a.priceUsd; 
    }
    return 0;
  });


  const topAssets = sortedAssets.slice(0, 10);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Best Assets Section */}
        <BestAssets assetsData={assetsData} dispatch={dispatch} selectCoin={selectCoin} />

        {/* General Filters */}
        <Filters />

        {/* All Assets Section */}
        <AllAssets assetsData={assetsData} dispatch={dispatch} selectCoin={selectCoin} />

        {/* Modal */}
        <Modal showModal={showModal} toggleModal={toggleModal} />
      </div>
    </div>
  );
};

export default Statistics;
