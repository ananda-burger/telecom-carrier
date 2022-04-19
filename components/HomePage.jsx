import * as phonesSlice from '@/store/slices/phonesSlice'
import Link from 'next/link'
import Pagination from '@/components/Pagination'
import classes from '@/components/HomePage.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

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

  const openDeleteConfirmation = (phone) => (event) => {
    event.preventDefault()
    const msg = `Are you sure you want to delete the DID number ${phone.value}? This operation is irreversible.`
    if (confirm(msg)) {
      dispatch(phonesSlice.remove({ id: phone.id, page: parsePage(query.page) }))
    }
  }

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1 className='display-6 m-0'>Numbers for sale</h1>
        <Link href='/add'>
          <button className='btn btn-primary fw-bold'>Add</button>
        </Link>
      </div>

      <div className='row pt-2 pb-2 mt-3 rounded-top d-none d-md-flex'>
        <div className='col-3 fw-bold'>Phone Number</div>
        <div className='col-2 fw-bold'>Monthly Price</div>
        <div className='col-2 fw-bold'>Setup Price</div>
        <div className='col-3 col-offset-9 fw-bold'>Currency</div>
      </div>

      <div className='row mt-2 mt-md-0'>
        {phones.map((phone) => {
          return (
            <div
              key={phone.id}
              className={`${classes.phoneRow} py-2 col-12 overflow-hidden`}
              data-testid='phone'
            >
              <div className='row py-1 gy-3 gy-md-0 d-md-flex align-items-center'>
                <div className='col-12 col-md-3'>
                  <span className='fw-bold d-md-none'>Phone: </span>
                  <span>{phone.value}</span>
                </div>
                <div className='col-6 col-md-2'>
                  <span className='fw-bold d-md-none'>Monthly price: </span>
                  <span>{phone.monthyPrice}</span>
                  <span className='d-md-none'> {phone.currency}</span>
                </div>
                <div className='col-6 col-md-2'>
                  <span className='fw-bold d-md-none'>Setup price: </span>
                  <span>{phone.setupPrice}</span>
                  <span className='d-md-none'> {phone.currency}</span>
                </div>
                <div className='d-none d-md-flex col-md-2'>{phone.currency}</div>
                <div className={`col col-md-3 text-md-end ${classes.actions}`}>
                  <Link href={`/edit/${phone.id}`}>
                    <a className='link-primary'>Edit</a>
                  </Link>
                  <a href='#' className='ms-2' onClick={openDeleteConfirmation(phone)}>
                    Delete
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Pagination />
    </>
  )
}
