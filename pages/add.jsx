import * as phonesSlice from '../store/slices/phonesSlice'
import NumbersForm from '../components/NumbersForm'

const Add = () => {
  return <NumbersForm action={phonesSlice.add} title='add' />
}

export default Add
