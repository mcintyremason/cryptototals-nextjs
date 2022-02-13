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
          <title>CryptoGet</title>
          <meta charSet="utf-8" />
          {/* <meta
        name="google-site-verification"
        content="yvJk6V5mexkpQDw1vr4H0bE0uIMXrgpJSC9kPx0MDtw"
      /> */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta
            name="description"
            content={`Cryptoget.dev is a website that empowers it's users to see the total value of 
            their cryptocurrency holdings at a single glance. The total value of a users holdings 
            is displayed, as well as a breakdown of the value of the holdings for each 
            individual cryptocurrency.`}
          />
          <link rel="icon" type="image/png" href="/img/icons/favicon-1/favicon.ico" />
          <link rel="stylesheet" href="/css/app.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <script async src="https://www.googletagmanager.com/gtag/js?id=UA-156934776-1"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'UA-156934776-1');`,
            }}
          /> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
