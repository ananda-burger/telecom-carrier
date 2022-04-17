import NavigationBar from './NavigationBar'

export default function Layout({children}) {
  return (
    <div>
      <NavigationBar />
      <div>{children}</div>
    </div>
  )
}
