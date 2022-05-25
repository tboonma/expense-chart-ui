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
    let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    let today = days[new Date().getDay()]
    for (let i = 0; i < expenses.length; i++) {
      allExpenses += expenses[i].amount
    }
    for (let i = 0; i < dateAmount; i++) {
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
        isToday: expenses[i].day === today,
      })
    }
    setTotalThisMonth(allExpenses.toFixed(2))
    setHeights(tempHeights)
  }

  function setActiveState(e) {
    e.preventDefault()
    let amountTag = e.target.nextSibling
    if (e.target.classList.contains('opacity-60')) {
      e.target.classList.remove('opacity-60')
      amountTag.classList.add('hidden')
    } else {
      e.target.classList.add('opacity-60')
      amountTag.classList.remove('hidden')
    }
  }
  return (
    <div className="bg-white rounded-xl p-6 px-8 grid gap-5">
      <h1 className="spending-title text-2xl font-bold">
        Spending - Last {dateAmount} days
      </h1>
      <div className="grid justify-center">
        <div className="spending-graph w-full flex flex-row items-end scrollbar-hide relative px-4">
          {heights.map((h) => (
            <div key={h.day} className="grid place-items-center">
              <div
                className={`spending-bar rounded-md hover:opacity-60 hover:cursor-pointer ${
                  h.isToday ? 'bg-cyan' : 'bg-softred'
                }`}
                style={{ height: h.height + 'px' }}
                onClick={setActiveState}
              ></div>
              <div
                id="amount"
                className="bg-darkbrown text-white rounded-md py-2 spending-bar-amount text-xs text-center font-bold text-bold w-14 absolute hidden"
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
            <p className="text-sm text-mediumbrown text-right">
              from last month
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpendingCard
