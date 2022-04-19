import * as phonesSlice from '../store/slices/phonesSlice'
import PhonesForm from '../components/PhonesForm'

const Add = () => {
  return <PhonesForm action={phonesSlice.add} title='Add' />
}

export default Add
