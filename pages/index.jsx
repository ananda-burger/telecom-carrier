import * as phonesSlice from '../store/slices/phonesSlice'
import { useSelector } from 'react-redux'

export default function Home() {
  const phones = useSelector(phonesSlice.selectPhones)

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
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
