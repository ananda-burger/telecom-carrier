import * as phonesSlice from '@/store/slices/phonesSlice'
import Layout from '@/components/Layout'
import PhonesForm from '@/components/PhonesForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Edit = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const phone = useSelector(phonesSlice.selectCurrentPhone)

  const phones = useSelector(phonesSlice.selectPhones)
  const id = parseInt(router.query.id, 10)
  const cachedPhone = phones.find((p) => p.id === id)

  useEffect(() => {
    if (router.isReady && !cachedPhone && !phone) {
      dispatch(phonesSlice.find(router.query.id))
    }
  }, [router.isReady, cachedPhone, phone, router.query.id])

  return (
    <Layout>
      <h1 className='display-6'>Edit number for sale</h1>
      <PhonesForm
        initialValues={cachedPhone || phone}
        action={phonesSlice.edit}
        buttonText='Edit'
      />
    </Layout>
  )
}

export default Edit
