import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import * as phonesSlice from '../../store/slices/phonesSlice'
import PhonesForm from '../../components/PhonesForm'

const Edit = () => {
  const router = useRouter()
  const phones = useSelector(phonesSlice.selectPhones)
  const currentPhone = phones.find((p) => p.id === parseInt(router.query.id, 10))

  return (
    <PhonesForm
      initialValues={currentPhone}
      action={phonesSlice.edit}
      isEditing={true}
      title='Edit'
    />
  )
}

export default Edit
