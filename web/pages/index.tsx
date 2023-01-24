import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Sidebar from '../components/sidebar'
import Header from "../components/header"
import TopCards from "../components/TopCards"
import BarChart from "../components/BarChart"
import RecentOrders from "../components/RecentOrders"
import Members from "../components/members"
import {data} from '../data/teams'
const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-red-300 min-h-screen">
        {/* <Sidebar/> */}
        <div className='pl-4'>
          <Header />
          <TopCards />
          <div className='pt-4 pr-4 grid md:grid-cols-3 grid-cols-1 gap-4 '>
            <BarChart />
            <Members />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
