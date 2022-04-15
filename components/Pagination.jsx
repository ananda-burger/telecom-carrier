import * as phonesSlice from '../store/slices/phonesSlice'
import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { times } from '../lib/util'

const previousLink = ({isReady, page}) => {
  const hasPreviousPage = page > 1
  const isDisabled = !isReady || !hasPreviousPage
  const previousPage = Math.max(page - 1, 1)
  return (
    <li className={classNames({ 'page-item': true, disabled: isDisabled })} >
      <Link href={{ pathname: '/', query: { page: previousPage } }}>
        <a className='page-link'>Previous</a>
      </Link>
    </li>
  )
}

const nextLink = ({isReady, page, nPages}) => {
  const hasNextPage = page < nPages
  const isDisabled = !isReady || !hasNextPage
  return (
    <li className={classNames({ 'page-item': true, disabled: isDisabled })} >
      <Link href={{ pathname: '/', query: { page: page + 1 } }}>
        <a className='page-link'>Next</a>
      </Link>
    </li>
  )
}

const pageLink = (page) => {
  return (
    <li key={page} className='page-item'>
      <Link href={{ pathname: '/', query: { page } }}>
        <a className='page-link'>{page}</a>
      </Link>
    </li>
  )
}

export default function Pagination() {
  const nPages = useSelector(phonesSlice.selectNumberOfPages)
  const router = useRouter()
  const {isReady, query} = router
  const page = Math.min(nPages, (parseInt(query.page, 10) || 1))

  return (
    <ul className="pagination">
      {previousLink({ isReady, page })}
      {times(nPages, i => pageLink(i + 1))}
      {nextLink({ isReady, page, nPages })}
    </ul>
  )
}
