import NavigationBar from './NavigationBar'

export default function Layout({children}) {
  return (
    <div>
      <NavigationBar />
      <div className='container-lg mt-3'>
        {children}
      </div>
    </div>
  )
}
