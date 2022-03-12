import { Box, Dialog, DialogTitle, Grid, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import {
  DonationModalOpenContext,
  SetDonationModalOpenContext,
} from '../../contexts/DonationModalContext'
import styles from './index.module.css'

type DonationModalProps = {
  open: boolean
  onClose?: () => void
}

export const DonationModal: React.FC<DonationModalProps> = ({ open }) => {
  const isDonationModalOpen = useContext(DonationModalOpenContext)
  const setIsDonationModalOpen = useContext(SetDonationModalOpenContext)

  const handleOnClose = () => setIsDonationModalOpen(!isDonationModalOpen)

  return (
    <Dialog open={open} onClose={handleOnClose} className={styles['donation-modal-container']}>
      <Box className={styles['donation-modal']}>
        <DialogTitle disableTypography>
          <Typography variant="h6" gutterBottom align="center">
            Thank you in advance for your donation! 🙂
          </Typography>
        </DialogTitle>
        <Grid container justifyContent="center">
          <Grid item xs={10}>
            <Typography align="center" gutterBottom className={styles['crypto-address']}>
              BTC: bc1qsa7q79acqswea2skye4xc4ecjrw356sl0qu70q
            </Typography>
          </Grid>
          <Grid item xs={10} className={styles['crypto-address']}>
            <Typography align="center">ETH: 0xab3327cbf5068c3ff0e06ef79b6af0a21b81ddbe</Typography>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
