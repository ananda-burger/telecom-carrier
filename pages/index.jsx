import * as phonesSlice from '../store/slices/phonesSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  const phones = useSelector(phonesSlice.selectPhones)
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(phonesSlice.add('number'))}>
        Add phone number
      </button>
      <ul>
        {phones.map(p => <li key={p}>{p}</li>)}
      </ul>
    </div>
  )
}
