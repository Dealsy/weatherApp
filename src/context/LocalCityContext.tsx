import { createContext, ReactNode, useEffect, useState } from 'react'
import { weatherProps } from '../types/types'

import useSWRImmutable from 'swr/immutable'
import Spinner from '../components/reusable_components/Spinner'

interface Props {
  children?: ReactNode
}
// Eslint disabled here because of the naming convention standards, however React requires
// the naming convention to be PascalCase
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// eslint-disable-next-line
export const LocalCityContext = createContext<any>(null)
// eslint-disable-next-line
export const LocalCityProvider = ({ children }: Props) => {
  const [loading, isLoading] = useState(true)
  //   const [localCity, setlocalCity] = useState<weatherProps>()
  const [error, setError] = useState(
    'Something went wrong!! Please try again later'
  )

  const [lat, setLat] = useState<number>()
  const [lng, setLng] = useState<number>()

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
  const url = localUrl
  const { data: cityData, error: cityError } = useSWRImmutable(url, fetcher)
  const localCity = cityData

  const value = {
    error,
    setError,
    localCity,
    loading,
    isLoading,
  }

  return (
    <LocalCityContext.Provider value={value}>
      {children}
    </LocalCityContext.Provider>
  )
}

export default LocalCityProvider
