'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

const FilterForm = () => {
  const [makes, setMakes] = useState([])
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [isNextDisabled, setIsNextDisabled] = useState(true)

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`
        )
        if (data.Results) {
          const makesData = data.Results.map((item) => ({
            Make_ID: item.MakeId,
            Make_Name: item.MakeName,
          }))
          setMakes(makesData)
        }
      } catch (error) {
        console.error('Error fetching makes:', error)
      }
    }

    fetchMakes()
  }, [])

  useEffect(() => {
    setIsNextDisabled(!selectedMake || !selectedYear)
  }, [selectedMake, selectedYear])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
        Select Vehicle Filters
      </h1>
      <div className="w-[400px] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="make"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Vehicle Make
            </label>
            <select
              id="make"
              className="mt-1 block w-full p-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
            >
              <option value="">Select a make</option>
              {makes.map((make) => (
                <option key={make.Make_ID} value={make.Make_ID}>
                  {make.Make_Name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="year"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Model Year
            </label>
            <select
              id="year"
              className="mt-1 block w-full p-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {[...Array(10).keys()].map((i) => {
                const year = 2015 + i
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              })}
            </select>
          </div>

          <Link href={`/result/${selectedMake}/${selectedYear}`}>
            <button
              className={`mt-4 w-full p-3 text-white rounded-lg ${
                isNextDisabled
                  ? 'bg-blue-500 opacity-50 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out'
              }`}
              disabled={isNextDisabled}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FilterForm
