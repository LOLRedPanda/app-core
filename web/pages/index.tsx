import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Sidebar from '../components/sidebar'
import Header from "../components/Header"
import TopCards from "../components/TopCards"
import BarChart from "../components/BarChart"
import Members from "../components/Members"
import {data} from '../data/teams'
import ListBox from '../components/ListBox'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Red Panda</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-red-300 min-h-screen">
        {/* <Sidebar/> */}
        <div className='pl-4'>
          <Header />
          <ListBox list={data} />
          <TopCards teamData={data[0]}/>
          <div className='pt-4 pr-4 grid md:grid-cols-3 grid-cols-1 gap-4 '>
            <BarChart />
            <Members teamData={data[0]} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
