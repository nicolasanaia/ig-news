import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss'
import { HomeProps } from './interfaces/IIndex';

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount}/month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src='/assets/images/avatar.svg' alt='Girl coding' />
      </main>
    </>
  )
}

//  Client-side (Users comments, would be rendered after the page has rendered)
//  Server-side 
//  Static Site Generation (Content posted on a blog)

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1MmUHxFwObFLv2AIUKPlRRkU')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,  // 24 hours
  }
}