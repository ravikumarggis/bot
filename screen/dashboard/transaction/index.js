"use client"
import React, { useState } from 'react'
import ToggleTabs from '../../../components/toggle-Tabs'

const Transaction = () => {
  const [transactionType, setTransactionType ]= useState("Active Trade")

  return (
    <div><div className="flex items-center justify-center">
        <ToggleTabs
        options={[
          { label: "Active Trade", value: "Active Trade" },
          { label: "History", value: "History" },
        ]}
        active={transactionType}
        onChange={setTransactionType}
      />
    </div>
    </div>
  )
}

export default Transaction