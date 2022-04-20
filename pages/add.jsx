import * as phonesSlice from '@/store/slices/phonesSlice'
import Layout from '@/components/Layout'
import PhonesForm from '@/components/PhonesForm'

const Add = () => {
  return (
    <Layout>
      <h1 className='display-6'>Add number for sale</h1>
      <PhonesForm action={phonesSlice.add} buttonText='Add' />
    </Layout>
  )
}

export default Add
