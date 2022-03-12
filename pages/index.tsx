import { Box, CircularProgress, Grid } from '@material-ui/core'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import DonationModal from '../components/DonationModal'
import HeaderBar from '../components/HeaderBar'
import HoldingsForm from '../components/HoldingsForm'
import { DonationModalOpenContext } from '../contexts/DonationModalContext'
import { useCryptogetApi } from '../hooks/useCryptogetAPI'
import { Cryptos } from '../models/Cryptoget'
import styles from './index.module.css'

const IndexPage: React.FC = (_) => {
  const isDonationModalOpen = useContext(DonationModalOpenContext)
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
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container justifyContent="center">
            <HoldingsForm cryptos={cryptos} />
            <DonationModal open={isDonationModalOpen} />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default IndexPage
