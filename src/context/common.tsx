import React, { createContext, useContext, useState } from 'react'
import { type Tab } from '../@types'
import CryptoCalculator from '../components/CryptoCalculator/CryptoCalculator'
import Tickers from '../components/Tickers/Tickers'
import { type HistoryTickers } from '../hooks/useTickers'
import { type HistoryCurrency } from '../hooks/useCrypto'
import { type AlertColor, type AlertPropsVariantOverrides } from '@mui/material'
import { type OverridableStringUnion } from '@mui/types'

const tabsOptions: Tab[] = [
  {
    label: 'Crypto Calculator',
    id: 'crypto-calculator',
    component: <CryptoCalculator />
  },
  {
    label: 'Tickers',
    id: 'tickers',
    component: <Tickers />
  }
]
export interface CommonContextProviderProps {
  children?: React.ReactNode
};

export interface SnackbarAlertProps {
  open: boolean
  variant?: OverridableStringUnion<'standard' | 'filled' | 'outlined', AlertPropsVariantOverrides>
  severity?: AlertColor | undefined
  message: string
}

export type SnackbarProps = SnackbarAlertProps | null

export interface CommonContextType {
  currentTab: number
  tabs: Tab[]
  setCurrentTab: (tabId: number) => void
  setTabs: (tabs: Tab[]) => void
  historyTickers: HistoryTickers[]
  setHistoryTickers: (history: HistoryTickers[]) => void
  historyCrypto: HistoryCurrency[]
  setHistoryCrypto: (history: HistoryCurrency[]) => void
  setSnackbar: (opts: SnackbarProps) => void
  snackbar: SnackbarProps
}

export const CommonContext = createContext<CommonContextType>({
  currentTab: 0,
  tabs: tabsOptions,
  setCurrentTab: () => {},
  setTabs: () => {},
  setHistoryTickers: () => {},
  historyTickers: [],
  setHistoryCrypto: () => {},
  historyCrypto: [],
  snackbar: null,
  setSnackbar: () => { }
})

export const CommonContextProvider = (props: CommonContextProviderProps): React.ReactNode => {
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [tabs, setTabs] = useState<Tab[]>(tabsOptions)
  const [historyTickers, setHistoryTickers] = useState<HistoryTickers[]>([])
  const [historyCrypto, setHistoryCrypto] = useState<HistoryCurrency[]>([])
  const [snackbar, setSnackbar] = useState<SnackbarProps>(null)

  const values = {
    setCurrentTab,
    currentTab,
    setTabs,
    tabs,
    historyTickers,
    setHistoryTickers,
    setHistoryCrypto,
    historyCrypto,
    snackbar,
    setSnackbar
  }

  return (
    <CommonContext.Provider value={values}>
      {props.children}
    </CommonContext.Provider>
  )
}

export const useCommon = (): CommonContextType => useContext(CommonContext)
