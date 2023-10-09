import React from 'react'
import { Grid, Typography } from '@mui/material'
import InputSelect, { type InputSelectOption } from '../Input/Select/Select'
import InputText from '../Input/Text/Text'
import { ButtonStyled } from '../Button/Button.styled'
import { ItemListStyled, SpanStyled } from './CryptoCalculator.styled'
import { useCrypto } from '../../hooks/useCrypto'
import { useCommon } from '../../context'

const CryptoCalculator = (): React.ReactNode => {
  const { currencies, toCurrency, fromCurrency, setFromCurrency, setToCurrency, amount, setAmount, convertCurrency } = useCrypto()
  const { historyCrypto } = useCommon()
  const transformCurrencies: InputSelectOption[] = currencies.map((currency) => { return { label: currency, value: currency } })
  return (
        <Grid container>
            <Grid item xs={12} paddingTop={10}>
                <Typography variant={'h4'} textTransform={'uppercase'} textAlign={'center'} color={'#21639C'} fontWeight={'bold'}>Crypto Calculator</Typography>
            </Grid>
            <Grid container paddingTop={2} paddingX={6} justifyContent={'center'}>
                <Grid item xs={3} paddingTop={2}>
                    <InputText label='from:' value={amount as unknown as string} id='from-amount' onChange={(value) => { setAmount(value as unknown as number) }} type={'number'} />
                </Grid>
                <Grid item xs={3} paddingTop={2} alignItems={'flex-end'} display={'flex'} paddingX={2}>
                    <InputSelect id="from-currency" onChange={(value) => { setFromCurrency(value) }} options={transformCurrencies} value={fromCurrency} />
                </Grid>
                <Grid item xs={1} paddingTop={5} alignItems={'center'} display={'flex'}>
                    <img src={require('./../../assets/arrow-to.png')} />
                </Grid>
                <Grid item xs={3} paddingTop={2}>
                    <InputSelect label='To:' id='to-currency' onChange={(value) => { setToCurrency(value) }} options={transformCurrencies} value={toCurrency} />
                </Grid>
                <Grid item xs={2} paddingTop={2} alignItems={'flex-end'} display={'flex'}>
                    <ButtonStyled variant='contained' onClick={() => { convertCurrency({ amount, fromCurrency, toCurrency }) }} disabled={fromCurrency === '' || toCurrency === ''}>Convert</ButtonStyled>
                </Grid>
            </Grid>
            <Grid container paddingTop={8}>
                <Grid item xs={12} justifyContent={'center'} display={'flex'}>
                    <Typography variant={'body2'} textTransform={'uppercase'} textAlign={'center'} color={'#21639C'} fontWeight={'bold'}>Result</Typography>
                </Grid>
                {historyCrypto.map((record, index) => {
                  const isFirst = index === 0
                  const { amount, amountMultiple, fromCurrency, toCurrency } = record
                  return (
                        <Grid item xs={12} paddingTop={2} justifyContent={'center'} display={'flex'} key={`record-${index}`}>
                            <ItemListStyled isFirst={isFirst} variant={isFirst ? 'h4' : 'h6'} textTransform={'uppercase'} textAlign={'center'} color={isFirst ? '#353A3E' : '#5F5F5B'} fontWeight={'bold'}>
                                {amount} {fromCurrency} <SpanStyled>is worth</SpanStyled> {amountMultiple} {toCurrency}
                            </ItemListStyled>
                        </Grid>
                  )
                })}
            </Grid>
        </Grid>
  )
}

export default CryptoCalculator
