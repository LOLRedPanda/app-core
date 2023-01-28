import '../styles/globals.css'
import Sidebar from '../components/sidebar'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Sidebar>  
      <Component {...pageProps} />
    </Sidebar>
    
  )
}

export default MyApp
