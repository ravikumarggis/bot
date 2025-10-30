"use client"
import React from 'react'
import ComingIndicator from './comming-indicator'

const CommingSoon = () => {
  return (
    <div className=" flex flex-col justify-center items-center gap-4">
    {/* <ComingIndicator isLoading className={"h-12 w-12"} />
    <p className="text-2xl font-semibold">Coming Soon</p> */}
      <img
                  src="/assets/other/comingsoon.png"
                  alt="comming son"
                  className="w-[200px] h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
  </div>
  )
}

export default CommingSoon