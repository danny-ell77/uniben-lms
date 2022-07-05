import Head from 'next/head'
import Image from 'next/image'
import { DashboardLayout } from '../components/Layout'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <div>
        Home
      </div>
    </div>
  )
}

Home.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default Home
