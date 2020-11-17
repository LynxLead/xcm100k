import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';
const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  const { data: {coinmetro: {eur} } } = props.result;

  let price = eur * 100000;
  let priceDecimal = price.toFixed(2);

  return (
    <div className={styles.container}>

    <div className={styles.postBody}>
      <div className={styles.uniLight}></div>
    </div>
      
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.cardText}>Cost to buy</span>
        <span className={styles.cardText}>100,000 XCM</span>
      </div>

      <div>
        <span className={styles.price}>€{priceDecimal}</span>
      </div>

      <div className={styles.imgCard} onClick={() => window.location.reload(false)}>
        <img className={styles.img} src="https://img.icons8.com/ios-glyphs/50/000000/refresh--v2.png"/>
      </div>
    </div>

    <a className={styles.anitLawsuit} href="https://icons8.com/icon/tovbiOioOGAO/refresh">Refresh icon by Icons8</a>

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



