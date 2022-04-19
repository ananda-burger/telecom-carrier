import Link from 'next/link'
import HomeIcon from '@/components/icons/HomeIcon'

export default function NavigationBar() {
  return (
    <nav className='navbar navbar-expand-md navbar-light rounded-bottom shadow p-3 mb-3 bg-body'>
      <div className='container-md'>
        <Link href='/'>
          <a className='fs-4' aria-label='Home'>
            <HomeIcon />
          </a>
        </Link>
      </div>
    </nav>
  )
}
