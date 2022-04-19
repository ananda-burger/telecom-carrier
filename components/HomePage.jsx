import Link from 'next/link'
import Pagination from '../components/Pagination'
import * as phonesSlice from '../store/slices/phonesSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const parsePage = (page) => {
  return Math.max(1, parseInt(page, 10) || 1)
}

export default function HomePage() {
  const phones = useSelector(phonesSlice.selectPhones)
  const dispatch = useDispatch()
  const router = useRouter()
  const { isReady, query } = router

  useEffect(() => {
    if (isReady) {
      dispatch(phonesSlice.fetch({ page: parsePage(query.page) }))
      const intervalId = setInterval(() => {
        dispatch(phonesSlice.poll({ page: parsePage(query.page) }))
      }, 10000)
      return function cleanup() {
        clearInterval(intervalId)
      }
    }
  }, [isReady, query.page])

  const openDeleteConfirmation = (id) => {
    if (confirm('Are you sure you want to delete this phone number?')) {
      dispatch(phonesSlice.remove({ id, page: parsePage(query.page) }))
    }
  }

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1 className='display-6'>Numbers for sale</h1>
        <Link href='/add'>
          <button className='btn btn-primary'>New</button>
        </Link>
      </div>
      <table className='mt-3 table table-striped table-borderless table-hover table=responsive'>
        <thead className='thead-light'>
          <tr>
            <th>Phone Number</th>
            <th>Monthly Price</th>
            <th>Setup Price</th>
            <th>Currency</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {phones.map((phone) => {
            return (
              <tr key={phone.id}>
                <td>{phone.value}</td>
                <td>{phone.monthyPrice}</td>
                <td>{phone.setupPrice}</td>
                <td>{phone.currency}</td>
                <td>
                  <Link href={`/edit/${phone.id}`}>
                    <a className='link-primary'>Edit</a>
                  </Link>
                </td>
                <td>
                  <a
                    className='card-link text-primary'
                    href='#'
                    onClick={() => openDeleteConfirmation(parseInt(phone.id, 10))}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination />
    </>
  )
}
