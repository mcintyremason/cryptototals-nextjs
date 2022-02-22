import { AppBar, Grid, Typography } from '@material-ui/core'
import React from 'react'
import styles from './index.module.css'

export const HeaderBar: React.FC = (_) => {
  return (
    <AppBar position="static" color="transparent" className={styles['header-bar']}>
      <Grid container justifyContent="center">
        <Typography variant="h4">CryptoGet</Typography>
      </Grid>
    </AppBar>
  )
}
