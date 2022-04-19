import * as phonesSlice from '@/store/slices/phonesSlice'
import Link from 'next/link'
import { range } from '@/lib/util'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export const pagesRange = ({ page, nPages }) => {
  const offset = 5
  const start = Math.max(1, Math.min(page, nPages) - offset)
  const end = Math.min(nPages, Math.max(2 * offset, page + offset))
  return range(start, end + 1)
}

const previousLink = ({ isReady, page }) => {
  const hasPreviousPage = page > 1
  const isDisabled = !isReady || !hasPreviousPage
  const previousPage = Math.max(page - 1, 1)
  return (
    <li className={`page-item ${isDisabled && 'disabled'}`}>
      <Link href={{ pathname: '/', query: { page: previousPage } }}>
        <a className='page-link'>Previous</a>
      </Link>
    </li>
  )
}

const nextLink = ({ isReady, page, nPages }) => {
  const hasNextPage = page < nPages
  const isDisabled = !isReady || !hasNextPage
  return (
    <li className={`page-item ${isDisabled && 'disabled'}`}>
      <Link href={{ pathname: '/', query: { page: page + 1 } }}>
        <a className='page-link'>Next</a>
      </Link>
    </li>
  )
}

const pageLink = (page, currentPage) => {
  return (
    <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
      <Link href={{ pathname: '/', query: { page } }}>
        <a className='page-link'>{page}</a>
      </Link>
    </li>
  )
}

export default function Pagination() {
  const nPages = useSelector(phonesSlice.selectNumberOfPages)
  const router = useRouter()
  const { isReady, query } = router

  if (nPages > 1) {
    const page = Math.min(nPages, parseInt(query.page, 10) || 1)
    return (
      <ul className='pagination justify-content-center mt-4'>
        {previousLink({ isReady, page })}
        {pagesRange({ page, nPages }).map((p) => pageLink(p, page))}
        {nextLink({ isReady, page, nPages })}
      </ul>
    )
  }
}
