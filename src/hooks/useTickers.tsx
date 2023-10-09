import { useEffect, useState } from 'react'
import { getCoins, getTickers } from '../services/coingecko'
import { useCommon } from '../context'

interface SearchTickers {
  coin: string
  market: string
}

export interface Coin {
  id: string
  symbol: string
  name: string
}

export interface HistoryTickers {
  lastValue: number
  lastTrade: string
  marketVolume: number
  market: string
  coin: string
  target: string
  base: string
  tradeUrl: string
}

export interface ConvertedCoin {
  btc: number
  eth: number
  usd: number
}
export interface Market {
  name: string
  identifier: string
  has_trading_incentive: boolean
}
export interface Ticker {
  base: string
  bid_ask_spread_percentage: number
  coin_id: string
  converted_last: ConvertedCoin
  converted_volume: ConvertedCoin
  is_anomaly: boolean
  is_stale: boolean
  last: number
  last_fetch_at: string
  last_traded_at: string
  market: Market
  target: string
  target_coin_id: string
  timestamp: string
  token_info_url: string | null
  trade_url: string
  trust_score: string
  volume: number
}
export interface UseTickers {
  coins: Coin[]
  setCoins: (currencies: Coin[]) => void
  markets: Market[]
  setMarkets: (markets: Market[]) => void
  market: string
  setMarket: (market: string) => void
  coin: string
  setCoin: (coin: string) => void
  searchTickers: ({ coin, market }: SearchTickers) => void
  getCoinsList: () => void
}
export const useTickers = (): UseTickers => {
  const [coin, setCoin] = useState<string>('')
  const [market, setMarket] = useState<string>('')
  const [coins, setCoins] = useState<Coin[]>([])
  const [markets, setMarkets] = useState<Market[]>([])
  const [tickers, setTickers] = useState<Ticker[]>([])
  const { historyTickers, setHistoryTickers, setSnackbar } = useCommon()

  const searchTickers = ({ market }: SearchTickers): void => {
    const findMarket = tickers.find((tk) => tk.market.identifier === market)
    if (findMarket !== undefined) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { base, target, volume, market, last_traded_at, last, trade_url } = findMarket
      setHistoryTickers([{
        coin: `${base}/${target}`,
        market: market.name,
        lastTrade: last_traded_at,
        lastValue: last,
        marketVolume: volume,
        target,
        base,
        tradeUrl: trade_url
      }, ...historyTickers])
    }
  }

  const getCoinsList = (): void => {
    getCoins
      .then((data) => {
        // I had to filter by btc and eth, because this endpoint was returning more than 10k results
        const coinsSlice = data.data.filter((coin: Coin) => ['btc', 'eth'].includes(coin.symbol))
        setCoins(coinsSlice)
      })
      .catch(() => { setSnackbar({ message: 'Error, check your internet conection and try again.', open: true }) })
  }

  useEffect(() => {
    getCoinsList()
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const marketsTickers = tickers?.map((ticker: Ticker[]) => ticker.market) ?? []
    setMarkets(marketsTickers)
  }, [tickers])

  useEffect(() => {
    if (coin !== '') {
      getTickers(coin)
        .then((data) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
          setTickers(data.tickers)
        })
        .catch(() => { setSnackbar({ message: 'Error, check your internet conection and try again.', open: true }) })
    }
  }, [coin])

  return { coin, coins, market, markets, setCoin, setCoins, setMarket, setMarkets, searchTickers, getCoinsList }
}
