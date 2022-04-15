import Link from 'next/link'
import * as phonesSlice from '../store/slices/phonesSlice'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import classNames from 'classnames'

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

export default function Pagination() {
  const nPages = useSelector(phonesSlice.selectNumberOfPages)
  const router = useRouter()
  const {isReady, query} = router
  const page = Math.min(nPages, (parseInt(query.page, 10) || 1))

  return (
    <ul className="pagination">
      {previousLink({ isReady, page })}
      {[...Array(nPages).keys()].map(index => {
        const page = index + 1
        return (
          <li key={page} className='page-item'>
            <Link href={{ pathname: '/', query: { page } }}>
              <a className='page-link'>{page}</a>
            </Link>
          </li>
        )
      })}
      {nextLink({ isReady, page, nPages })}
    </ul>
  )
}
