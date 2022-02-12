import Head from 'next/head'
import Layout from '../components/layout/layout'
import Link from 'next/link'

export default function Home( {} ) {
  return (
    <Layout home>
      <Head>
        <title>Overview</title>
      </Head>
      <h1>Overview</h1>
      <p>Please click on Logo or <Link href="/address-book"><a className="underline">here</a></Link> to view!</p>
    </Layout>
  )
}