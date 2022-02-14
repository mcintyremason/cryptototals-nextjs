import { Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import styles from './index.module.css'

export const Footer: React.FC = (_) => {
  return (
    <Paper elevation={8} color="transparent" className={styles['footer']}>
      <Grid container justifyContent="center">
        <Typography variant="h6" gutterBottom>
          Donations are always welcome! 😌
        </Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Typography>BTC: bc1qsa7q79acqswea2skye4xc4ecjrw356sl0qu70q</Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Typography>ETH: 0xab3327cbf5068c3ff0e06ef79b6af0a21b81ddbe</Typography>
      </Grid>
    </Paper>
  )
}
