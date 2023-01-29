import type { NextPage } from 'next'
import Head from 'next/head'
import Header from "../components/header"
import {data} from '../data/teams'
import DashBoard from '../components/Dashboard'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Red Panda | LoL Stat Companion</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className="bg-[#101021] min-h-screen">
        <div className='pl-4'>
          <Header />
          <DashBoard data={data}/>
        </div>
      </main>
    </div>
  )
}

export default Home
