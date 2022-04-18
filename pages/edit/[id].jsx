import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import * as phonesSlice from '../../store/slices/phonesSlice'
import NumbersForm from '../../components/NumbersForm'

const Edit = () => {
  const router = useRouter()
  const phones = useSelector(phonesSlice.selectPhones)
  const currentPhone = phones.find((p) => p.id === parseInt(router.query.id, 10))

  return <NumbersForm formInitialValues={currentPhone} action={phonesSlice.edit} title='edit' />
}

export default Edit
