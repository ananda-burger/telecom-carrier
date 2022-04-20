import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='d-flex flex-column text-align-middle align-items-center'>
      <p className='display-4 mt-5'>Whoops!</p>
      <p className='text-center my-4 fs-5'>We could not find the page you are looking for</p>
      <Link href='/' passHref>
        <button className='btn btn-lg btn-primary fs-5'>Return Home</button>
      </Link>
    </div>
  )
}
