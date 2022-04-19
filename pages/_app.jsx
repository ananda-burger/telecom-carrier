import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store/config'

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
