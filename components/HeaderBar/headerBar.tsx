import { AppBar, Grid, Link, Typography } from '@material-ui/core'
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import React, { useState } from 'react'
import MenuDrawer from '../../components/MenuDrawer'
import { ListMenuLink } from '../../models/ListMenu'
import Hamburger from '../Hamburger'
import styles from './index.module.css'

const DEAULT_MENU_LINKS: Array<ListMenuLink> = [
  {
    text: 'Home',
    href: '/',
    icon: <HomeOutlinedIcon color="primary" />,
    isExpanded: false,
  },
  {
    text: 'Balances',
    href: '/balances',
    icon: <AccountBalanceWalletOutlinedIcon color="primary" />,
    isExpanded: false,
  },
  // {
  //   text: 'About',
  //   href: '/about',
  //   icon: <InfoOutlinedIcon color="primary" />,
  //   isExpanded: false,
  // },
]

export const HeaderBar: React.FC = (_) => {
  const [hambugerActive, setHambugerActive] = useState(false)
  const [menuLinks, setMenuLinks] = useState<Array<ListMenuLink>>([...DEAULT_MENU_LINKS])

  const hamburgerOnClick = () => {
    setHambugerActive((hambugerActive) => !hambugerActive)
  }

  const resetMenuLinks = () => {
    const updatedListMenuLinks = menuLinks.map((_link) => {
      _link.isExpanded = false
      return _link
    })

    setMenuLinks(updatedListMenuLinks)
  }

  return (
    <AppBar position="static" color="transparent" className={styles['header-bar-container']}>
      <Grid container>
        <Grid item xs={10} sm={4} justifyContent="flex-start">
          <Grid
            container
            direction="column"
            justifyContent="center"
            className={styles['menu-title']}
          >
            <Link href="/">
              <Typography variant="h4">CryptoGet</Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={2} sm={8} className={styles['hamburger-nav-container']}>
          <Hamburger active={hambugerActive} onClick={hamburgerOnClick} />
        </Grid>
        <Grid>
          <MenuDrawer
            links={menuLinks}
            open={hambugerActive}
            hamburgerOnClick={hamburgerOnClick}
            onClose={() => {
              hamburgerOnClick()
              resetMenuLinks()
            }}
            onOpen={hamburgerOnClick}
          />
        </Grid>
      </Grid>
    </AppBar>
  )
}
