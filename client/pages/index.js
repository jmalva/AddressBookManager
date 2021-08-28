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
      <p>Welcome to your Lob full-stack take home challenge!</p>
      <p>Please head over to <Link href="/address-book"><a className="underline">Address book</a></Link> to get started</p>
    </Layout>
  )
}