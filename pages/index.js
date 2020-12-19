import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';
import ReactGA from 'react-ga';
import { useEffect } from 'react';

ReactGA.initialize('G-MKK4N38S17');

const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  

  const { data: {coinmetro: {eur} } } = props.result;

  const fiat = 'EUR';
  const lang = 'en-US';
  //const fiat = 'USD';
  //const lang = 'en-US';

  let price = eur * 100000;
  let priceDecimal = price.toLocaleString(lang, {
    style: 'currency',
    currency: fiat,
  });

  let xmcPrice = eur.toFixed(4);

  return (

    <div className={styles.container}>
      <head>
        <title>XCM-100K</title>
      </head>
    <div className={styles.postBody}>
      <div className={styles.uniLight}></div>
    </div>
      
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.cardText}>Cost to buy</span>
        <span className={styles.cardText}>100,000 XCM</span>
        <span className={styles.xcmPriceText}>€{xmcPrice}</span>
      </div>

      <div>
        <span className={styles.price}>{priceDecimal}</span>
      </div>

      <div className={styles.imgCard} onClick={() => window.location.reload(false)}>
        <img className={styles.img} src="https://img.icons8.com/ios-glyphs/50/000000/refresh--v2.png"/>
      </div>
    </div>

    <a className={styles.anitLawsuit} href="https://icons8.com/icon/tovbiOioOGAO/refresh">Icons by Icons8</a>

  </div>
  )
}


export async function getServerSideProps(context) {
  const result = await coinGeckoClient.simple.price({
    ids: 'CoinMetro',
    vs_currencies: 'eur',
  });
  return {
    props: {
      result
    }
  };
}



