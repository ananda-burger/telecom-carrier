import Pagination from '../components/Pagination'
import Layout from '../components/Layout'
import HomePage from '../components/HomePage'

export default function Home() {
  return (
    <Layout>
      <HomePage />
      <Pagination />
    </Layout>
  )
}
