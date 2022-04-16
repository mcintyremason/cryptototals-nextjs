import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@material-ui/core'
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined'
import { format } from 'currency-formatter'
import { useCallback, useEffect, useState } from 'react'
import HeaderBar from '../../components/HeaderBar'
import { useCryptoTotalsApi } from '../../hooks/useCryptoTotalsAPI'
import { useQuery } from '../../hooks/useQuery'
import { BalanceTotalsResponse, GetBalanceQueryParams } from '../../models/CryptoTotals'
import { isEmpty, reduceCryptos } from '../../utils/baseUtils'
import styles from './index.module.css'

type BalancesProps = {}

const BalancesPage: React.FC<BalancesProps> = (_) => {
  const { parsed } = useQuery()
  const { getBalanceFor, isLoading } = useCryptoTotalsApi()
  const [balances, setBalances] = useState<BalanceTotalsResponse>(null)

  const fetchGetBalances = useCallback(
    async (cryptos: GetBalanceQueryParams) => {
      const response = await getBalanceFor(cryptos)

      setBalances(response)
    },
    [getBalanceFor],
  )

  const cryptoBalanceRow = (index: number) => {
    const cryptoSymbol = Object.keys(balances?.currencies)[index]

    return (
      <TableRow key={`${cryptoSymbol}-balance`}>
        <TableCell component="th" scope="row">
          <Typography variant="h6">{cryptoSymbol}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="h6">
            {format(balances?.currencies[cryptoSymbol].total, { code: 'USD' })}
          </Typography>
        </TableCell>
      </TableRow>
    )
  }

  const warningCard = (
    <Card elevation={5}>
      <CardContent className={styles['warning-card-content']}>
        <Grid container justifyContent="center">
          <Grid item xs={1}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              className={styles['warning-icon-container']}
            >
              <WarningOutlinedIcon color="action" fontSize="large" />
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body2" align="center">
              Return to the home page to enter your cryptocurrency holdings
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )

  useEffect(() => {
    if (Object.keys(parsed)[0] && isEmpty(balances)) {
      fetchGetBalances(parsed)
    }
  }, [parsed, balances])

  useEffect(() => {
    const localStorageCryptoEntries = JSON.parse(localStorage.getItem('crypto_entries'))

    // only run if query string isn't set, and localstorage is set
    if (
      isEmpty(Object.keys(parsed)[0]) &&
      isEmpty(balances) &&
      !isEmpty(localStorageCryptoEntries)
    ) {
      fetchGetBalances(reduceCryptos(localStorageCryptoEntries))
    }
  }, [])

  return (
    <Box className={styles['balances-container']}>
      <HeaderBar />
      {isLoading ? (
        <Grid container justifyContent="center" className={styles['progress-container']}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container justifyContent="center" className={styles['balances-container']}>
          {isEmpty(balances) ? (
            warningCard
          ) : (
            <Grid
              container
              direction="column"
              justifyContent="center"
              item
              xs={10}
              sm={7}
              md={6}
              lg={5}
            >
              {balances?.currencies && (
                <>
                  <Toolbar disableGutters className={styles['balance-table-toolbar']}>
                    <Grid container justifyContent="space-between">
                      <Typography variant="h4">Total:</Typography>
                      <Typography variant="h4">
                        {format(balances?.total, { code: 'USD' })}
                      </Typography>
                    </Grid>
                  </Toolbar>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h6">Crypto Symbol</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="h6">Balance</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.keys(balances?.currencies).map((_, index) =>
                          cryptoBalanceRow(index),
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}

export default BalancesPage
