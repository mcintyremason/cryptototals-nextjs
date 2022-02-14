import { Box, CircularProgress, Grid } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import HeaderBar from '../components/HeaderBar'
import HoldingsForm from '../components/HoldingsForm'
import { useCryptogetApi } from '../hooks/useCryptogetAPI'
import { Cryptos } from '../models/Cryptoget'
import styles from './index.module.css'

const IndexPage: React.FC = (_) => {
  const { getCryptoList, isLoading } = useCryptogetApi()
  const [cryptos, setCryptos] = useState<Cryptos>([])

  const fetchCryptoList = useCallback(async () => {
    const cryptoList = await getCryptoList()
    setCryptos(cryptoList)
  }, [getCryptoList])

  useEffect(() => {
    fetchCryptoList()
  }, [])

  return (
    <Box>
      <HeaderBar />
      <Grid container justifyContent="space-between" className={styles['home']}>
        {isLoading ? (
          <Grid container justifyContent="center" className={styles['progress-container']}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container justifyContent="center">
            <HoldingsForm cryptos={cryptos} />
          </Grid>
        )}
      </Grid>
      <Footer />
    </Box>
  )
}

export default IndexPage
