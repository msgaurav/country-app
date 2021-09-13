import React from 'react'
import Head from 'next/head'
import { ListCountry } from '../components'

export default function App() {
  const globalStyle = 'body {background-color: #f5f5f5;}'

  return (
    <>
      <Head>
        <style>{globalStyle}</style>
      </Head>
      <ListCountry />
    </>
  )
}
