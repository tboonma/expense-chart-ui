import React from 'react'
import '../assets/styles/components.css'

const BalanceCard = () => {
  return (
    <div className="balance-background w-full rounded-xl p-6 flex px-8">
      <div role="contentinfo" className="w-4/5">
        <p className="text-white">My balance</p>
        <h1 className="text-white text-3xl font-bold">$921.48</h1>
      </div>
      <div className="w-1/5 grid place-items-center">
        <svg
          width="72"
          height="48"
          viewBox="0 0 72 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <circle fill="#382314" cx="48" cy="24" r="24" />
            <circle stroke="#FFF" stroke-width="2" cx="24" cy="24" r="23" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default BalanceCard
