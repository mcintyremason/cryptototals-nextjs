import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  NativeSelect,
  TextField,
  Typography,
} from '@material-ui/core'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'
import LayersClearOutlinedIcon from '@material-ui/icons/LayersClearOutlined'
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { CryptoEntry, Cryptos } from '../../models/Cryptoget'
import { clearLocalStorage, isEmpty } from '../../utils/baseUtils'
import { modifyHistory } from '../../utils/historyUtils'
import styles from './index.module.css'

type HoldingsFormProps = {
  cryptos: Cryptos
}

const DEFAULT_CRYPTO_ENTRY = {
  symbol: 'default',
  holdings: 0,
}

export const HoldingsForm: React.FC<HoldingsFormProps> = ({ cryptos }) => {
  const router = useRouter()
  const [cryptoEntries, setCryptoEntries] = useState<Array<CryptoEntry>>([DEFAULT_CRYPTO_ENTRY])

  const handleCryptoOnChange = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
    if (event.target.value) {
      const updatedEntries = cryptoEntries.map((entry, i) => {
        if (i === index) {
          return {
            symbol: event.target.value,
            holdings: cryptoEntries[index].holdings,
          }
        }
        return entry
      })

      setCryptoEntries(updatedEntries)
    }
  }

  const handleHoldingsOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const updatedEntries = cryptoEntries.map((entry, i) => {
      if (i === index) {
        return {
          symbol: cryptoEntries[index].symbol,
          holdings: parseFloat(event.target.value),
        }
      }
      return entry
    })

    setCryptoEntries(updatedEntries)
  }

  const handleOnSubmit = () => {
    const cryptoBalancesRequest = cryptoEntries
      .map((entry) => {
        return {
          [entry.symbol]: entry.holdings.toString(),
        }
      })
      .reduce((acc, curr) => ({
        ...acc,
        ...curr,
      }))

    localStorage.setItem('crypto_entries', JSON.stringify(cryptoEntries))
    modifyHistory(
      router,
      {
        previousRequest: cryptoBalancesRequest,
      },
      cryptoBalancesRequest,
      false,
      '/balances',
    )
  }

  const handleAddCryptoOnClick = () => {
    setCryptoEntries([...cryptoEntries, DEFAULT_CRYPTO_ENTRY])
  }

  const handleRemoveCryptoOnClick = () => {
    const updatedCryptoEntries = [...cryptoEntries]

    if (cryptoEntries.length > 1) {
      updatedCryptoEntries.pop()
    } else {
      updatedCryptoEntries.pop()
      updatedCryptoEntries.push(DEFAULT_CRYPTO_ENTRY)
    }

    setCryptoEntries(updatedCryptoEntries)
  }

  const handleClearSavedCryptos = () => {
    clearLocalStorage()
    setCryptoEntries([DEFAULT_CRYPTO_ENTRY])
  }

  useEffect(() => {
    const localStorageCryptoEntries = JSON.parse(localStorage.getItem('crypto_entries'))
    if (localStorageCryptoEntries && !isEmpty(cryptos)) {
      setCryptoEntries(localStorageCryptoEntries)
    }
  }, [cryptos])

  const cryptoOptions = cryptos?.map((crypto) => (
    <option value={crypto.symbol} key={crypto.symbol}>
      {crypto.fullName}
    </option>
  ))

  const cryptoEntry = (index: number) => (
    <Grid container justifyContent="space-between" key={`crypto-entry-${index}`}>
      <Grid item xs={6} md={5}>
        {index === 0 && (
          <Grid container>
            <FormLabel component="legend" className={styles['text-field-label-container']}>
              Crypto Symbol
            </FormLabel>
          </Grid>
        )}
        <Grid container className={styles['text-field-label-container']}>
          <NativeSelect
            value={cryptoEntries[index].symbol}
            onChange={(e) => handleCryptoOnChange(e, index)}
          >
            <option value="default" disabled>
              Select Crypto
            </option>
            {cryptoOptions}
          </NativeSelect>
        </Grid>
      </Grid>
      <Grid item xs={5} md={5}>
        <Grid container>
          {index === 0 && (
            <FormLabel component="legend" className={styles['text-field-label-container']}>
              Holdings
            </FormLabel>
          )}
        </Grid>
        <Grid container className={styles['text-field-label-container']}>
          <TextField
            type="number"
            inputProps={{
              min: '0',
              step: '0.000001',
            }}
            variant="outlined"
            value={cryptoEntries[index].holdings}
            onChange={(e) => handleHoldingsOnChange(e, index)}
            color="primary"
            className={styles['text-field']}
          />
        </Grid>
      </Grid>
    </Grid>
  )

  return (
    <Card elevation={5} className={styles['holdings-form-container']}>
      <CardContent className={styles['card-content']}>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              Welcome!
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h6" align="center">
              Select your cryptocurrencies below and enter your holdings to find the total value of
              all of your cryptocurrencies
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions className={styles['card-actions']}>
        <Grid container>
          <Grid container justifyContent="flex-end" className={styles['clear-saved-cryptos']}>
            <Button
              variant="text"
              color="primary"
              size="small"
              startIcon={<LayersClearOutlinedIcon />}
              onClick={handleClearSavedCryptos}
            >
              Clear Cryptos
            </Button>
          </Grid>
          <Grid container justifyContent="center">
            <FormGroup>
              {cryptoEntries.map((_, i) => cryptoEntry(i))}
              <Grid container justifyContent="flex-start" className={styles['icon-container']}>
                <Grid item xs={6}>
                  <IconButton
                    color="primary"
                    aria-label="add crypto entry"
                    component="span"
                    onClick={handleAddCryptoOnClick}
                    className={styles['add-icon']}
                  >
                    <AddCircleOutlinedIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="remove crypto entry"
                    component="span"
                    onClick={handleRemoveCryptoOnClick}
                    className={styles['remove-icon']}
                  >
                    <RemoveCircleOutlinedIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
              <Grid container justifyContent="center" className={styles['submit-container']}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOnSubmit()}
                  className={styles['card-button']}
                >
                  Sumbit
                </Button>
              </Grid>
            </FormGroup>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
