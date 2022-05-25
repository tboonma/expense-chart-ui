import React from 'react'
import '../assets/styles/styles.css'
import BalanceCard from '../components/BalanceCard.js'
import SpendingCard from '../components/SpendingCard'

const Home = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="components-width grid gap-6 max-w-lg">
        <BalanceCard />
        <SpendingCard />
      </div>
    </div>
  )
}

export default Home
