import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// CoinCap API base URL
const baseUrl = 'https://api.coincap.io/v2/';

const createRequest = (url) => ({ url });

export const cryptoApi = createApi({
  reducerPath: 'cryptoasc',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRates: builder.query({
      query: () => createRequest('rates'), 
    }),
    getExchanges: builder.query({
      query: () => createRequest('exchanges'), 
    }),
    getMarkets: builder.query({
      query: () => createRequest('markets'), 
    }),
    getAllAssets: builder.query({
      query: () => createRequest('assets'), 
    }),
    getAsset: builder.query({
      query: (id) => createRequest(`assets/${id}`),
    }),
  }),
});

export const {
  useGetRatesQuery,
  useGetAllAssetsQuery,
  useGetExchangesQuery,
  useGetMarketsQuery,
  useGetAssetQuery,
} = cryptoApi;
