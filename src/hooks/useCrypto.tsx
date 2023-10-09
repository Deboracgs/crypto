import { useEffect, useState } from 'react'
import { getPricesByCurrencies, getSupportedCurrencies } from '../services/coingecko'
import { useTickers } from './useTickers'
import { useCommon } from '../context'

export interface ConvertCurrency {
  amount: number
  fromCurrency: string
  toCurrency: string
}
export interface HistoryCurrency extends ConvertCurrency {
  amountMultiple: number
}

export interface UseCrypto {
  getCurrencies: () => void
  currencies: string[]
  setCurrencies: (currencies: string[]) => void
  toCurrency: string
  setToCurrency: (currency: string) => void
  fromCurrency: string
  setFromCurrency: (currency: string) => void
  amount: number
  setAmount: (currency: number) => void
  convertCurrency: (values: ConvertCurrency) => void
}
export const useCrypto = (): UseCrypto => {
  const [currencies, setCurrencies] = useState<string[]>([])
  const [toCurrency, setToCurrency] = useState<string>('')
  const [fromCurrency, setFromCurrency] = useState<string>('')
  const [amount, setAmount] = useState<number>(1)
  const { setHistoryCrypto, historyCrypto } = useCommon()
  const { coins } = useTickers()

  const getCurrencies = (): void => {
    getSupportedCurrencies
      .then((data) => { setCurrencies(data.data) })
      .catch((error) => { console.log('error', error) })
  }

  const convertCurrency = ({ amount, fromCurrency, toCurrency }: ConvertCurrency): void => {
    // limited only for bitcoin and etherum
    const fromCurrencyIdentifier = coins.find((coin) => coin.symbol === fromCurrency)?.name.toLocaleLowerCase() ?? 'bitcoin'

    getPricesByCurrencies(fromCurrencyIdentifier, toCurrency)
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const valueConverted = data[fromCurrencyIdentifier][toCurrency]
        const valueMultiplied = valueConverted * amount
        const history: HistoryCurrency = { fromCurrency, toCurrency, amount, amountMultiple: valueMultiplied }
        setHistoryCrypto([history, ...historyCrypto])
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  useEffect(() => {
    getCurrencies()
  }, [])

  return { getCurrencies, currencies, setCurrencies, toCurrency, setToCurrency, fromCurrency, setFromCurrency, amount, setAmount, convertCurrency }
}
