import Link from 'next/link'
import * as phonesSlice from '../store/slices/phonesSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
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

export default function Home() {
  const phones = useSelector(phonesSlice.selectPhones)
  const totalCount = useSelector(phonesSlice.selectTotalCount)
  const nPages = Math.ceil(totalCount / 5)
  const dispatch = useDispatch()
  const router = useRouter()
  const {isReady, query} = router
  // TODO: make sure the page is a valid number and less than or equal to nPages.
  const page = parseInt(query.page, 10)

  useEffect(() => {
    if (isReady) {
      dispatch(phonesSlice.fetch({page}))
    }
  }, [isReady, page])

  return (
    <div className='container-lg'>
      <h1 className='display-5'>Phones list</h1>
      <Link href="/add">
        <button className='btn btn-primary'>New</button>
      </Link>
      <table className='table table-striped table-borderless table-hover table=responsive'>
        <thead className="thead-light">
          <tr>
            <th>Value</th>
            <th>Monthly Price</th>
            <th>Setup Price</th>
            <th>Currency</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {phones.map(phone => {
            return (
              <tr key={phone.id}>
                <td>{phone.value}</td>
                <td>{phone.monthlyPrice}</td>
                <td>{phone.setupPrice}</td>
                <td>{phone.currency}</td>
                <td>
                  <Link href={`/edit/${phone.id}`}>
                    <a className='link-primary'>Edit</a>
                  </Link>
                </td>
                <td>
                  <a className="link-primary" onClick={() => dispatch(phonesSlice.remove(phone.id))}>
                    Delete
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <ul className="pagination">
        {previousLink({isReady, page})}
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
        {nextLink({isReady, page, nPages})}
      </ul>
    </div>
  )
}
