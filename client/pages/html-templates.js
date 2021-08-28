import Head from 'next/head'
import Layout from '../components/layout/layout'

export default function Home( {} ) {
  return (
    <Layout home>
      <Head>
        <title>Overview</title>
      </Head>
      <h1>HTML Templates</h1>
    </Layout>
  )
}