import axios from 'axios'

const API = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 1000
})

export const getSupportedCurrencies = API.get('/simple/supported_vs_currencies').then((data) => data).catch((error) => error)
export const getPricesByCurrencies = async (fromCurrency: string, toCurrency: string): Promise<void> => await API.get(`/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`).then((data) => data.data).catch((error) => error)
export const getCoins = API.get('/coins/list').then((data) => data).catch((error) => error)
export const getTickers = async (coin: string): Promise<void> => await API.get(`/coins/${coin}/tickers`).then((data) => data.data).catch((error) => error)
