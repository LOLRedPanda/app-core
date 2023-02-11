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
      <footer className='text-xs bg-[#101021] text-[#7D98A1] text-center'>RedPanda isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</footer>
    </div>
  )
}

export default Home
