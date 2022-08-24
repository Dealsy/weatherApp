import { useEffect, useState, useContext } from 'react'
import { CityProps } from '../types/types'

import { LocalCityContext } from '../context/LocalCityContext'

import '../styles/main.css'

import clsx from 'clsx'
import LocalCity from '../components/dashboard/local/LocalCity'
import Cities from '../components/dashboard/cities/Cities'
import Spinner from '../components/reusable_components/Spinner'

export default function Dashboard() {
  const { error, setError, isLoading, localCity } = useContext(LocalCityContext)

  const [city, setCity] = useState<CityProps>()

  //@ts-ignore
  const draggableContent: CityProps[] = city?.list

  const apiKey = process.env.REACT_APP_API_KEY
  const cititesUrl = `http://api.openweathermap.org/data/2.5/group?id=2158177,2174003,2078025,2153391,2073124,2147714,2172517&units=metric&appid=${apiKey}`

  useEffect(() => {
    isLoading(true)
    fetch(cititesUrl)
      .then((value) => value.json())
      .then((value) => {
        setCity(value)
      })
      .catch((err) => {
        setError(err)
      })
  }, [cititesUrl])

  useEffect(() => {
    if (localCity?.cod === 400) {
      isLoading(true)
    } else {
      isLoading(false)
    }
  }, [localCity])

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
        <h1 className="my-5">Australia Capital Cities</h1>
        <div
          className={clsx(
            'w-3/4 flex flex-col justify-center m-auto mt-2 gap-2 mb-24',
            'md:flex md:flex-row md:gap-5 md:w-3/4',
            'lg:flex lg:flex-row lg:gap-5 lg:w-3/4 flex-wrap',
            'xl:lg:flex xl:flex-row xl:gap-5 xl:w-3/4 xl:flex-nowrap'
          )}
        >
          {city.list.map((cityData, index) => (
            <Cities
              key={cityData.id}
              cityData={cityData}
              index={index}
              draggableContent={draggableContent}
            />
          ))}
          {city.cod === 429 && (
            <div className="text-red-500 bg-red-50 p-2">{error}</div>
          )}
        </div>
      </div>
    </div>
  )
}
