import { Box, Card, CardActions, CardContent, Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import HeaderBar from '../../components/HeaderBar'
import styles from './index.module.css'

const AboutPage: React.FC = (_) => {
  return (
    <Box>
      <HeaderBar />
      <Grid container justifyContent="space-between" className={styles['about']}>
        <Grid container justifyContent="center">
          <Card elevation={5} className={styles['holdings-form-container']}>
            <CardContent className={styles['card-content']}>
              <Grid container justifyContent="center">
                <Grid item xs={11}>
                  <Typography variant="h5" align="center">
                    We're a one stop shop to help find the total value of all of your holdings
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions className={styles['card-actions']}>
              <Grid container></Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AboutPage
