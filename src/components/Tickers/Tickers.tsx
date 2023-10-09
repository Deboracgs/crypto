import React from 'react'
import { Grid, Typography } from '@mui/material'
import InputSelect, { type InputSelectOption } from '../Input/Select/Select'
import { ButtonStyled } from '../Button/Button.styled'
import { type Coin, useTickers, type Market } from '../../hooks/useTickers'
import { AStyled, PaperStyled } from './Tickers.styled'
import { useCommon } from '../../context'

const Tickers = (): React.ReactNode => {
  const { markets, coins, coin, market, setMarket, setCoin, searchTickers } = useTickers()
  const { historyTickers } = useCommon()

  const transformCoins: InputSelectOption[] = coins.map((coinValue: Coin) => { return { label: coinValue.symbol, value: coinValue.id } })
  const transformMarkets: InputSelectOption[] = markets.map((marketValue: Market) => { return { label: marketValue.name, value: marketValue.identifier } })

  return (
        <Grid container>
            <Grid item xs={12} paddingTop={10}>
                <Typography variant={'h4'} textTransform={'uppercase'} textAlign={'center'} color={'#21639C'} fontWeight={'bold'}>Tickers</Typography>
            </Grid>
            <Grid container paddingTop={2} paddingX={6} justifyContent={'center'}>

                <Grid item xs={3} paddingTop={2} alignItems={'flex-end'} display={'flex'} paddingX={2}>
                    <InputSelect label='Coin:' id="coin" onChange={(value) => { setCoin(value) }} options={transformCoins} value={coin} />
                </Grid>

                <Grid item xs={3} paddingTop={2}>
                    <InputSelect label='Market:' id='market' onChange={(value) => { setMarket(value) }} options={transformMarkets} value={market} />
                </Grid>
                <Grid item xs={2} paddingTop={2} alignItems={'flex-end'} display={'flex'}>
                    <ButtonStyled variant='contained' onClick={() => { searchTickers({ coin, market }) }} disabled={market === '' || coin === ''}>Search</ButtonStyled>
                </Grid>
            </Grid>
            <Grid container paddingTop={8}>
                    {historyTickers.map((record, index) => {
                      const { coin, lastTrade, lastValue, market, marketVolume, base, tradeUrl } = record
                      return (
                        <Grid item xs={12} justifyContent={'center'} display={'flex'} key={`ticker-${index}`} marginBottom={2}>
                            <PaperStyled>
                                <Grid container>
                                    <Grid item xs={6} >
                                        <Grid container>
                                            <Grid item xs={12} justifyContent={'flex-start'} display={'flex'}><Typography variant='h4'>{coin}</Typography></Grid>
                                            <Grid item xs={12} justifyContent={'flex-start'} display={'flex'} paddingTop={2}><Typography><b>Last value:</b> {lastValue} {base}</Typography></Grid>
                                            <Grid item xs={12} justifyContent={'flex-start'} display={'flex'}><Typography><b>Last trade:</b> {lastTrade}</Typography></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container >
                                            <Grid item xs={12} justifyContent={'flex-end'} display={'flex'}><AStyled target='_blank' href={tradeUrl}>View more</AStyled></Grid>
                                            <Grid item xs={12} justifyContent={'flex-end'} display={'flex'} paddingTop={4}><Typography><b>Market:</b> {market}</Typography></Grid>
                                            <Grid item xs={12} justifyContent={'flex-end'} display={'flex'}><Typography><b>Market Volume:</b> {marketVolume}</Typography></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </PaperStyled>
                        </Grid>
                      )
                    })}
            </Grid>
        </Grid>
  )
}

export default Tickers
