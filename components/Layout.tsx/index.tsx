import Head from 'next/head'
import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'CryptoGet' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      {/* <meta
        name="google-site-verification"
        content="yvJk6V5mexkpQDw1vr4H0bE0uIMXrgpJSC9kPx0MDtw"
      /> */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={``} />
      <link rel="icon" type="image/png" href="/img/icons/favicon-1/favicon.ico" />
    </Head>
    {children}
  </div>
)

export default Layout
