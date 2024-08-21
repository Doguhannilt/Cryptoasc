import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LogarithmicScale
} from 'chart.js';
import { clearSelectedCoin } from '../redux-services/slices/coinSlice';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  LogarithmicScale,
  Legend,
  PointElement
);

const Modal = ({ showModal, toggleModal }) => {
  const dispatch = useDispatch();
  const selectedCoin = useSelector(state => state.coin.selectedCoin);

  // Dinamik veri oluşturma
  const chartData = {
    labels: ['Current Price', '24h Volume', 'Market Cap'], 
    datasets: [
      {
        label: 'Values - Logarithmic Scale',
        data: [
          selectedCoin ? parseFloat(selectedCoin.priceUsd) : 0,
          selectedCoin ? parseFloat(selectedCoin.volumeUsd24Hr) : 0, 
          selectedCoin ? parseFloat(selectedCoin.marketCapUsd) : 0, 
        ],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 105, 0.2)',
        fill: true,
        pointBackgroundColor: '#007bff',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        type: 'logarithmic',
        ticks: {
          callback: function(value, index, values) {
            return value.toLocaleString(); 
          }
        },
      },
    },
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 ${showModal ? 'block' : 'hidden'} z-50 flex items-center justify-center`}
      onClick={toggleModal}
    >
      <div
        className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">Coin Details</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            onClick={() => {
              dispatch(clearSelectedCoin());
              toggleModal();
            }}
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="p-4 md:p-5">
          {selectedCoin ? (
            <div>
              <h2 className="text-xl font-bold">{selectedCoin.name}</h2>
              <p className="text-gray-500">Symbol: {selectedCoin.symbol}</p>
              <p className="text-gray-500">Price: ${selectedCoin.priceUsd}</p>
              <p className="text-gray-500">Market Cap: ${selectedCoin.marketCapUsd}</p>
              <p className="text-gray-500">24h Volume: ${selectedCoin.volumeUsd24Hr}</p>
              <div className="mt-4">
                <Line data={chartData} options={options} />
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No coin selected</p>
          )}
        </div>

        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
          <button
            onClick={toggleModal}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;