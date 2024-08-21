import React from 'react';
import { useSearchCryptoNewsQuery } from '../redux-services/newsApi';
import { BsNewspaper } from "react-icons/bs";

const News = () => {
  const params = {
    q: 'coin',
    country: 'us',
    language: 'en',
    category: 'business',
  };
  
  const { data: newsData, isFetching, error } = useSearchCryptoNewsQuery(params);


  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const articles = newsData?.results || []; 

  return (
    <div className="container mx-auto px-4 py-8 cursor-pointer">
      <div className='flex justify-center text-gray-800 gap-2 '>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Latest News on Coins</h1>
        <BsNewspaper className='text-3xl mt-2'/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[200vh] ">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-y-scroll	"
          >
            {article?.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-40 object-cover lazyload"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <p className="text-gray-600 mb-4">{article.source_name}</p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
