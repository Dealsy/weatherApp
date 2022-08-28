import clsx from 'clsx'
import { useContext, useState } from 'react'
import useSWRImmutable from 'swr/immutable'

import SearchInput from '../components/dashboard/SearchInput'
import Cities from '../components/dashboard/cities/Cities'
import LocalCity from '../components/dashboard/local/LocalCity'
import GlobalCity from '../components/dashboard/searched_ctiy/GlobalCity'
import Spinner from '../components/reusable_components/Spinner'
import { LocalCityContext } from '../context/LocalCityContext'
import '../styles/main.css'
import { cityProps } from '../types/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Dashboard() {
  const { error, localCity } = useContext(LocalCityContext)

  // Grabbing data for the cities component with SWR.

  const cityIds = ['2158177,2174003,2078025,2153391,2073124,2147714,2172517']
  const [citySearch, setCitySearch] = useState('')
  const [text, setText] = useState('')

  const apiKey = process.env.REACT_APP_API_KEY
  const citySearchResults = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${apiKey}`
  const cititesUrl = `https://api.openweathermap.org/data/2.5/group?id=${cityIds}&units=metric&appid=${apiKey}`

  const searchURL = citySearchResults
  const { data: searchData } = useSWRImmutable(searchURL, fetcher)

  const url = cititesUrl
  const { data: cityData } = useSWRImmutable(url, fetcher)
  const city: cityProps = cityData

  function handleChange(e: any) {
    setText(e.target.value)
  }

  function clearSearch() {
    setText('')
    setCitySearch('')
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    setCitySearch(text)
    setText('')
  }

  if (!localCity || !city || !searchData) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className={clsx(`flex flex-col justify-center`)}>
      <h1
        className={clsx(
          'my-2 overlay m-auto p-2 rounded-lg mt-5',
          'md:w-2/6',
          'sm:w-1/2'
        )}
      >
        Australia Capital Cities
      </h1>
      <div
        className={clsx(
          'w-3/4 flex flex-col justify-center m-auto mt-2 gap-2',
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
      <div className="flex flex-col">
        <SearchInput
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          clearSearch={clearSearch}
          citySearch={citySearch}
        />

        {searchData.cod === '404' ? (
          <></>
        ) : (
          <h1
            className={clsx(
              'my-2 overlay m-auto p-2 rounded-lg mt-5 w-full',
              'md:w-2/6',
              'sm:w-1/2'
            )}
          >
            {citySearch === '' ? 'Your Location' : searchData.name}
          </h1>
        )}

        <div className={`flex m-auto hover:bg-panelBlue flex-col mb-24`}>
          {citySearch === '' ? (
            <LocalCity key={localCity.id} weatherData={localCity} />
          ) : (
            <GlobalCity key={searchData.id} searchData={searchData} />
          )}

          {localCity.cod === 429 && (
            <div className="text-red-500 bg-red-50 p-2">{error}</div>
          )}
        </div>
      </div>
    </div>
  )
}
