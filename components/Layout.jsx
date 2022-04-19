import NavigationBar from './NavigationBar'
import styles from './Layout.module.css'
import * as phonesSlice from '../store/slices/phonesSlice'
import { useSelector } from 'react-redux'

export default function Layout({ children }) {
  const isLoading = useSelector(phonesSlice.selectIsLoading)

  return (
    <div>
      <NavigationBar />
      {isLoading && (
        <span className={styles.spinner}>
          <span className='spinner-border text-primary' role='status' aria-hidden='true'></span>
          <span className='visually-hidden'>Loading...</span>
        </span>
      )}
      <div className='container-lg mt-3'>{children}</div>
    </div>
  )
}
