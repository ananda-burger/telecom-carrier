import Link from 'next/link'
import * as phonesSlice from '../store/slices/phonesSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function Home() {
  const phones = useSelector(phonesSlice.selectPhones)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(phonesSlice.fetch())
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Monthly Price</th>
            <th>Setup Price</th>
            <th>Currency</th>
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
                  <button onClick={() => dispatch(phonesSlice.remove(phone.id))}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Link href="/add">
        <a> ADD PHONE </a>
      </Link>
    </div>
  )
}
