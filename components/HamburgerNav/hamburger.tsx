import styles from './hamburgerNav.module.css'
import classNames from 'classnames'

import { Grid } from '@material-ui/core'

type HamburgerNavProps = {
  active: boolean
  onClick: (event: any) => void
}

export const HamburgerNav: React.FC<HamburgerNavProps> = (props: HamburgerNavProps) => {
  const { active, onClick } = props

  return (
    <Grid container justifyContent="flex-end" className={styles['hamburger-container']}>
      <button
        onClick={onClick}
        type="button"
        aria-label="Hamburger Navigation"
        className={classNames(
          styles['hamburger'],
          styles['hamburger--collapse'],
          active ? styles['is-active'] : '',
        )}
      >
        <span className={styles['hamburger-box']}>
          <span className={styles['hamburger-inner']}></span>
        </span>
      </button>
    </Grid>
  )
}
