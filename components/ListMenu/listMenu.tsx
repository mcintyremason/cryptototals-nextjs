import {
  Collapse,
  Grid,
  GridJustification,
  Link,
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { ListMenuLink } from '../../models/ListMenu'
import { subLinksActive } from '../../utils/baseUtils'
import styles from './listMenu.module.css'

type ListMenuProps = {
  justifyText?: GridJustification
  links: Array<ListMenuLink>
}

export const ListMenu: React.FC<ListMenuProps> = (props: ListMenuProps) => {
  const { links, justifyText = 'flex-start' } = props
  const router = useRouter()

  const [menuLinks, setListMenuLinks] = useState<Array<ListMenuLink>>(links)

  const expandLinkHandler = (link: ListMenuLink) => {
    const updatedListMenuLinks = menuLinks.map((_link) => {
      if (link === _link) {
        _link.isExpanded = !_link.isExpanded
      }
      return _link
    })

    setListMenuLinks(updatedListMenuLinks)
  }

  const linkClickHandler = (e: any, link: ListMenuLink) => {
    e.preventDefault()
    router.push(link.href)
  }

  return (
    <Grid className={styles['list-menu-container']} container direction="column" wrap="nowrap">
      {menuLinks.map((link: ListMenuLink) => (
        <Grid key={`${link.text}-link`} container>
          {link?.subLinks?.length ? (
            // if there are sublinks
            <List
              aria-labelledby={`${link.text}-menu-item`}
              className={classNames(styles['list-menu'])}
            >
              <ListItem
                button
                disableGutters
                onClick={() => expandLinkHandler(link)}
                className={styles['list-menu-item']}
              >
                <Grid
                  container
                  justifyContent="space-between"
                  className={classNames(
                    styles['list-menu-link'],
                    link.isExpanded ? styles['active'] : '',
                    subLinksActive(link, router) && styles['active'],
                  )}
                  onClick={(e: any) => {
                    link.onClick ? link.onClick() : linkClickHandler(e, link)
                  }}
                >
                  <Grid item xs={2} container direction="column" justifyContent="center">
                    {link.icon ? <ListItemIcon>{link.icon}</ListItemIcon> : null}
                  </Grid>
                  <Grid item xs={10} container justifyContent={justifyText}>
                    <Grid
                      item
                      xs={10}
                      container
                      direction="column"
                      justifyContent="center"
                      className={styles['list-menu-link-text']}
                    >
                      {link.text}
                    </Grid>
                    <Grid item xs={2} container direction="column" justifyContent="center">
                      {link.isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <Collapse in={link.isExpanded} timeout="auto" unmountOnExit>
                {link?.subLinks.map((subLink) => (
                  <List key={`${subLink.text}-sublink`} component="div" disablePadding>
                    <ListItem button>
                      <Link
                        className={classNames(
                          styles['list-menu-link'],
                          subLink.href === router.pathname ? styles['active'] : '',
                        )}
                        href={subLink.href}
                      >
                        <Grid container justifyContent="space-between">
                          <Grid item xs={2} container direction="column" justifyContent="center">
                            {subLink.icon ? <ListItemIcon>{subLink.icon}</ListItemIcon> : null}
                          </Grid>
                          <Grid item xs={10} container direction="column" justifyContent="center">
                            <Grid container justifyContent={justifyText}>
                              {subLink.text}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Link>
                    </ListItem>
                  </List>
                ))}
              </Collapse>
            </List>
          ) : (
            // if there are no subLinks
            <Grid
              key={`${link.text}-link`}
              container
              className={styles['list-menu-link-container']}
            >
              <List
                aria-labelledby={`${link.text}-menu-item`}
                className={classNames(styles['list-menu'])}
              >
                <ListItem
                  button
                  disableGutters
                  onClick={() => (link.onClick ? link.onClick() : expandLinkHandler(link))}
                  className={classNames(styles['list-menu-item'], styles['list-menu-link'])}
                >
                  <Link
                    className={classNames(
                      styles['list-menu-link'],
                      link.href === router.pathname ? styles['active'] : '',
                    )}
                    href={link.onClick ? '#' : link.href}
                  >
                    <Grid container justifyContent="space-between">
                      <Grid item xs={2} container direction="column" justifyContent="center">
                        {link.icon ? <ListItemIcon>{link.icon}</ListItemIcon> : null}
                      </Grid>
                      <Grid item xs={10} container direction="column" justifyContent="center">
                        <Grid container justifyContent={justifyText}>
                          {link.text}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Link>
                </ListItem>
              </List>
            </Grid>
          )}
        </Grid>
      ))}
    </Grid>
  )
}
