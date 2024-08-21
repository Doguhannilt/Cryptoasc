import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = 'https://newsdata.io/api/1';

const apiKey = import.meta.env.VITE_NEWS_API_KEY; 

const createRequest = (endpoint, params) => ({
  url: `${baseUrl}${endpoint}`,
  params: {
    apikey: apiKey,
    ...params
  }
});

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    searchCryptoNews: builder.query({
      query: (params) => createRequest('/news', params),
    }),
  }),
});

export const { useSearchCryptoNewsQuery } = newsApi;
