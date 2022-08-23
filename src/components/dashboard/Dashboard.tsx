import { useEffect, useState } from 'react'
import { weatherProps, CityProps } from '../../types/types'

import '../../styles/main.css'

import clsx from 'clsx'
import LocalCity from '../local/LocalCity'
import Cities from '../cities/Cities'
import Spinner from '../reusable_components/Spinner'

export default function Dashboard() {
  const [loading, isLoading] = useState(true)
  const [localCity, setlocalCity] = useState<weatherProps>()
  const [city, setCity] = useState<CityProps>()
  const [lat, setLat] = useState<number>()
  const [lng, setLng] = useState<number>()
  const [error, setError] = useState(
    'Something went wrong!! Please try again later'
  )

  useEffect(() => {
    const geolocationAPI = navigator.geolocation
    const getUserCoordinates = () => {
      if (!geolocationAPI) {
        setError('Geolocation API is not available in your browser!')
      } else {
        geolocationAPI.getCurrentPosition(
          (position) => {
            isLoading(true)
            const { coords } = position
            setLat(coords.latitude)
            setLng(coords.longitude)
          },
          (error) => {
            setError('Something went wrong getting your position!')
          }
        )
      }
    }

    if (!geolocationAPI) {
      setError('Geolocation API is not available in your browser!')
    } else {
      geolocationAPI.getCurrentPosition((position) => {
        const { coords } = position
        setLat(coords.latitude)
        setLng(coords.longitude)
      })
    }
    getUserCoordinates()
  }, [])

  const apiKey = process.env.REACT_APP_API_KEY
  const localUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
  const cititesUrl = `http://api.openweathermap.org/data/2.5/group?id=2158177,2174003,2078025,2153391,2073124,2147714,2172517&units=metric&appid=${apiKey}`

  useEffect(() => {
    isLoading(true)

    Promise.all([
      fetch(localUrl).then((value) => value.json()),
      fetch(cititesUrl).then((value) => value.json()),
    ])
      .then((value) => {
        console.log(value)
        setlocalCity(value[0])
        setCity(value[1])
      })
      .catch((err) => {
        setError(err)
      })
  }, [localUrl, cititesUrl])

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
          {loading ? (
            <div> ...loading! </div>
          ) : (
            <LocalCity key={localCity.id} weatherData={localCity} />
          )}

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
          {loading ? (
            <div> ...loading! </div>
          ) : (
            city.list.map((cityData) => (
              <Cities key={cityData.id} cityData={cityData} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
