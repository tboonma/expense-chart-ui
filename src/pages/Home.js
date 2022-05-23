import React from 'react'
import '../assets/styles/styles.css'
import BalanceCard from '../components/BalanceCard.js'

const Home = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="w-2/6 grid gap-4 max-w-md">
        <BalanceCard />
      </div>
    </div>
  )
}

export default Home
