import Link from 'next/link'
import * as phonesSlice from '../store/slices/phonesSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Pagination from '../components/Pagination'

export default function Home() {
  const phones = useSelector(phonesSlice.selectPhones)
  const nPages = useSelector(phonesSlice.selectNumberOfPages)
  const dispatch = useDispatch()
  const router = useRouter()
  const {isReady, query} = router
  const page = Math.min(nPages, (parseInt(query.page, 10) || 1))

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
      <Pagination/>
    </div>
  )
}
