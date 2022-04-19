import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as phonesSlice from '@/store/slices/phonesSlice'
import PhonesForm from '@/components/PhonesForm'

const Edit = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const phones = useSelector(phonesSlice.selectPhones)
  const phone = useSelector(phonesSlice.selectCurrentPhone)
  const id = parseInt(router.query.id, 10)
  const existingPhone = phones.find((p) => p.id === id)

  useEffect(() => {
    if (router.isReady && !existingPhone) {
      dispatch(phonesSlice.find(router.query.id))
    }
  }, [router.isReady])

  return (
    <PhonesForm initialValues={existingPhone || phone} action={phonesSlice.edit} title='Edit' />
  )
}

export default Edit
