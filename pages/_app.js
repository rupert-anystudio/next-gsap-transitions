import 'normalize.css'
import '../styles/globals.css'
import Layout from '../components/layout'
import { PagePropsProvider } from '../components/pageProps'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
