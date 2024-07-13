import React from 'react'

const Remaining = (props) => {
  return (
    <div className="w-full flex justify-evenly py-3">
            <div className="flex w-full flex-col items-center border-b-4 border-red-500">
              <p className="font-bold text-xl text-slate-700">{props.entries}</p>
              <p>Your Entries</p>
            </div>
            <div className="flex w-full flex-col items-center border-b-4 border-blue-500">
              <p className="font-bold text-xl text-slate-700">123</p>{" "}
              <p>Total Entries</p>
            </div>
            <div className="flex w-full flex-col items-center border-b-4 border-green-500">
              <p className="font-bold text-lg text-slate-700 text-center">
                56 Days Remaining
              </p>
            </div>
          </div>
  )
}

export default Remaining