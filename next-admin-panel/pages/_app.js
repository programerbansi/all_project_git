import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { makeStore, wrapper } from '../app/redux/store'
import { Provider } from 'react-redux'


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={makeStore()}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider> 
    </Provider>
  )
}

export default wrapper.withRedux(MyApp)
