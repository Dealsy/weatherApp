import { ReactNode, createContext, useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'

/*
  This context is used to store the local city data and the error message if the API call fails.
  The local city data is used to display the local weather data on the dashboard.
  
  I make use of SWR to fetch the data from the API. SWR is a React Hooks library for remote data fetching.
*/

interface Props {
  children?: ReactNode
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Eslint disabled here because of the naming convention standards, however React requires
// the naming convention to be PascalCase for components and Contexts.
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

  // The below useEffect is used to get the users GeoLocation, so that the local weather data can be displayed

  useEffect(() => {
    const geolocationAPI = navigator.geolocation
    const getUserCoordinates = () => {
      if (!geolocationAPI) {
        setError('Geolocation API is not available in your browser!')
      } else {
        geolocationAPI.getCurrentPosition(
          (position) => {
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
    getUserCoordinates()
  }, [])

  const apiKey = process.env.REACT_APP_API_KEY
  const localUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
  const url = localUrl
  const { data: cityData } = useSWRImmutable(url, fetcher)
  const localCity = cityData

  const value = {
    error,
    setError,
    localCity,
  }

  return (
    <LocalCityContext.Provider value={value}>
      {children}
    </LocalCityContext.Provider>
  )
}

export default LocalCityProvider
