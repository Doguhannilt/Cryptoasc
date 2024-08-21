import React from 'react';
import { useDispatch } from 'react-redux';
import { useGetExchangesQuery } from '../redux-services/cryptoascApi';
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaRankingStar } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa";

// Function to categorize exchanges by rank ranges
const categorizeExchanges = (data) => {
  const categories = {
    '0-20': [],
    '20-40': [],
    '40-60': [],
    '60+': []
  };

  data.forEach(exchange => {
    const rank = parseInt(exchange.rank, 10);

    if (rank <= 20) categories['0-20'].push(exchange);
    else if (rank <= 40) categories['20-40'].push(exchange);
    else if (rank <= 60) categories['40-60'].push(exchange);
    else categories['60+'].push(exchange);
  });

  return categories;
};

// Function to limit number of exchanges to show
const limitExchanges = (exchanges, limit = 9) => {
  return exchanges.slice(0, limit);
};

const Exchanges = () => {
  const dispatch = useDispatch();
  const { data: exchangesData, isFetching, error } = useGetExchangesQuery();
  console.log(exchangesData)

  if (isFetching) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error loading exchanges</div>;

  
  let exchangesArray = exchangesData;

  if (exchangesData && typeof exchangesData === 'object') {
    exchangesArray = exchangesData.data || exchangesData.exchanges || exchangesData;
  }

  if (!Array.isArray(exchangesArray)) {
    return <div className="text-center p-4">Data format is not as expected.</div>;
  }

  const categorizedExchanges = categorizeExchanges(exchangesArray);

  return (
    <div className="p-4">
      {Object.entries(categorizedExchanges).map(([range, exchanges]) => (
        <section key={range} className="mb-8 ">
          <h2 className="text-2xl font-bold mb-4 text-white shadow-2xl text-center">{range}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {limitExchanges(exchanges).map(exchange => (
              <div
                key={exchange.exchangeId}
                className=" rounded-lg shadow-lg overflow-hidden mx-20 my-auto transition-transform transform hover:scale-105"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2 ">{exchange.exchangeId}</h3>
                  <div className='flex'>
                    <p className="text-white mb-1"><strong>Rank:</strong> {exchange.rank}</p>
                    <FaRankingStar className='text-white ml-2 mt-1'/>
                    </div>

                  <p className="text-white mb-1"><strong>Volume USD:</strong> ${Number(exchange.volumeUsd).toLocaleString()}</p>
                  <div className='flex'>
                    <p className="text-white mb-1"><strong>Trading Pairs:</strong> {exchange.tradingPairs}</p>
                    <FaMoneyBillTrendUp className='text-white ml-2 mt-1'/>
                    </div>
                  <p className="text-white mb-4"><strong>Percent Total Volume:</strong> {parseFloat(exchange.percentTotalVolume).toFixed(2)}%</p>
                </div>
                <div className='flex bg-blue-500 justify-center'> 
                               <a
                  href={exchange.exchangeUrl}
                  className="block bg-blue-500 text-white text-center py-2 font-semibold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                  </a>   
                  
                  <FaCaretRight className='text-white ml-2 mt-3'/>
                </div>

              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Exchanges;
