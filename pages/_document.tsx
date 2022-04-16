import Document, { Head, Html, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <title>CryptoTotals</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta
            name="description"
            content={`CryptoTotals.com is a website that empowers it's users to see the total value of 
            their cryptocurrency holdings at a single glance. The total value of a users holdings 
            is displayed, as well as a breakdown of the value of the holdings for each 
            individual cryptocurrency.`}
          />
          <link rel="icon" type="image/png" href="/img/favicon/favicon.ico" />
          <link rel="stylesheet" href="/css/app.css" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-W2W9CGXN42"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W2W9CGXN42');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
