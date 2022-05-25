import React, { useEffect, useState } from 'react'
import '../assets/styles/components.css'
import expenses from '../assets/json/data.json'

const SpendingCard = () => {
  const [dateAmount, setDateAmount] = useState(7)
  const [totalThisMonth, setTotalThisMonth] = useState(0)
  const [heights, setHeights] = useState([])

  useEffect(() => {
    implementGraph()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function implementGraph() {
    setDateAmount(Math.min(expenses.length, dateAmount))
    await getData()
  }

  async function getData() {
    let allExpenses = 0
    let maxHeight = expenses[0].amount
    for (let i = 0; i < expenses.length; i++) {
      allExpenses += expenses[i].amount
      if (expenses[i].amount > maxHeight) {
        maxHeight = expenses[i].amount
      }
    }
    let multiplier = 160 / maxHeight
    let tempHeights = []
    for (let i = 0; i < dateAmount; i++) {
      tempHeights.push({
        day: expenses[i].day,
        amount: expenses[i].amount,
        height: expenses[i].amount * multiplier,
        isMax: expenses[i].amount === maxHeight,
      })
    }
    setTotalThisMonth(allExpenses.toFixed(2))
    setHeights(tempHeights)
  }
  return (
    <div className="bg-white rounded-xl p-6 px-8 grid gap-5">
      <h1 className="spending-title text-2xl font-bold">
        Spending - Last {dateAmount} days
      </h1>
      <div className="grid justify-center">
        <div className="spending-graph w-full flex flex-row items-end scrollbar-hide relative px-5">
          {heights.map((h) => (
            <div key={h.day} className="grid place-items-center">
              <div
                className={`spending-bar rounded-md hover:opacity-60 hover:cursor-pointer ${
                  h.isMax ? 'bg-cyan' : 'bg-softred'
                }`}
                style={{ height: h.height + 'px' }}
              ></div>
              <div
                className="bg-darkbrown text-white rounded-md py-2 spending-bar-amount text-xs text-center font-bold text-bold w-14 absolute"
                style={{ top: 165 - h.height }}
              >
                ${h.amount}
              </div>
              <div className="w-11 text-center text-mediumbrown text-sm">
                {h.day}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="spending-line"></div>
      <div className="spending-summary w-full grid grid-cols-3">
        <div className="col-span-2">
          <p className="text-sm text-mediumbrown">total this month</p>
          <h1 className="text-4xl font-bold text-darkbrown">
            ${totalThisMonth}
          </h1>
        </div>
        <div className="grid place-items-end">
          <div className="">
            <p className="font-bold text-darkbrown text-right">+2.4%</p>
            <p className="text-sm text-mediumbrown">from last month</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpendingCard
