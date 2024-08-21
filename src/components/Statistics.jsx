import React from 'react';
import {
  useGetAllAssetsQuery,
  useGetExchangesQuery,
  useGetMarketsQuery,
} from '../redux-services/cryptoascApi';

const Statistics = () => {

  const { data: assetsData, isFetching: isFetchingAssets } = useGetAllAssetsQuery();
  const { data: exchangesData, isFetching: isFetchingExchanges } = useGetExchangesQuery();
  const { data: marketsData, isFetching: isFetchingMarkets } = useGetMarketsQuery();

    console.log(assetsData)
  if (isFetchingAssets || isFetchingExchanges || isFetchingMarkets) {
    return <div>Loading...</div>; 
  }
   
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 mt-20 mb-10 ml-20 xl:ml-40 lg:grid-cols-3 gap-2 xl:grid-cols-5">
      <div>
        <h4 className="text-2xl font-bold text-gray-400">Total Cryptocurrencies</h4>
        <h4 className="text-5xl font-bold text-white">{assetsData?.data.length}</h4>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-gray-400">Total Exchanges</h4>
        <h4 className="text-5xl font-bold text-white">{exchangesData?.data.length}</h4>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-gray-400">Total Market Cap</h4>
        <h4 className="text-5xl font-bold text-white">
          ${marketsData?.data.reduce((acc, market) => acc + parseFloat(market.marketCapUsd || 0), 0).toFixed(2)}
        </h4>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-gray-400">Total 24h Volume</h4>
        <h4 className="text-5xl font-bold text-white">
          ${marketsData?.data.reduce((acc, market) => acc + parseFloat(market.volumeUsd24Hr || 0), 0).toFixed(2)}
        </h4>
      </div>
      <div className='xl:ml-10'>
        <h4 className="text-2xl font-bold text-gray-400">Total Markets</h4>
        <h4 className="text-5xl font-bold text-white">{marketsData?.data.length}</h4>
      </div>
    </div>
  );
};

export default Statistics;
