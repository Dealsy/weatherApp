import clsx from 'clsx'
import { useContext } from 'react'
import useSWRImmutable from 'swr/immutable'

import Cities from '../components/dashboard/cities/Cities'
import LocalCity from '../components/dashboard/local/LocalCity'
import Spinner from '../components/reusable_components/Spinner'
import { LocalCityContext } from '../context/LocalCityContext'
import '../styles/main.css'
import { cityProps } from '../types/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Dashboard() {
  const { error, localCity } = useContext(LocalCityContext)

  // Grabbing data for the cities component with SWR.

  const cityIds = ['2158177,2174003,2078025,2153391,2073124,2147714,2172517']

  const apiKey = process.env.REACT_APP_API_KEY
  const cititesUrl = `https://api.openweathermap.org/data/2.5/group?id=${cityIds}&units=metric&appid=${apiKey}`
  const url = cititesUrl
  const { data: cityData } = useSWRImmutable(url, fetcher)
  const city: cityProps = cityData

  if (!localCity || !city) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className={clsx(`flex flex-row justify-center`)}>
      <div className="flex flex-col mt-5">
        <h1>Your Location</h1>
        <div className={`flex m-auto hover:bg-panelBlue flex-col`}>
          <LocalCity key={localCity.id} weatherData={localCity} />
          {localCity.cod === 429 && (
            <div className="text-red-500 bg-red-50 p-2">{error}</div>
          )}
        </div>

        <h1
          className={clsx(
            'my-2 overlay m-auto p-2 rounded-lg',
            'md:w-1/4',
            'sm:w-1/2'
          )}
        >
          Australia Capital Cities
        </h1>
        <div
          className={clsx(
            'w-3/4 flex flex-col justify-center m-auto mt-2 gap-2 mb-24  ',
            'md:flex md:flex-row md:gap-5',
            'lg:flex lg:flex-row lg:gap-5 flex-wrap',
            'xl:lg:flex xl:flex-row xl:gap-5  xl:flex-nowrap'
          )}
        >
          {city.list.map((cityData) => (
            <Cities key={cityData.id} cityData={cityData} />
          ))}
          {city.cod === 429 && (
            <div className="text-red-500 bg-red-50 p-2">{error}</div>
          )}
        </div>
      </div>
    </div>
  )
}
