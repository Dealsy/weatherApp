import '../../styles/main.css'
import clsx from 'clsx'
import LocalCity from '../local/LocalCity'
import Cities from '../cities/Cities'
import { useEffect, useState } from 'react'

type cityProps = {
  weatherData: {
    description: string
    icon: string
    name: string
    temp: string
    cod: string
  }
}

const cities = [
  { name: 'Melbounre', temp: '14', conditions: 'Cloudy', id: 1 },
  { name: 'Sydney', temp: '17', conditions: 'Cloudy', id: 2 },
  { name: 'Brisbane', temp: '27', conditions: 'Sunny', id: 3 },
  { name: 'Perth', temp: '30', conditions: 'Rain', id: 4 },
  { name: 'Adelaide', temp: '15', conditions: 'Cloudy', id: 5 },
  { name: 'Hobart', temp: '13', conditions: 'Rain', id: 6 },
  { name: 'Darwin', temp: '34', conditions: 'Sunny', id: 7 },
  { name: 'Canberra', temp: '20', conditions: 'Sunny', id: 8 },
]

const cityName = 'Bacchus Marsh'

export default function Dashboard() {
  const [localCity, setlocalCity] = useState<cityProps>()
  const [error, setError] = useState(
    'Something went wrong!! Please try again later'
  )

  console.log('local', localCity)

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName},{au}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setlocalCity(data))
      .catch((error) => setError(error))
  }, [])

  if (!localCity) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col mt-14">
        <h1>Your Location</h1>
        <div className="flex m-auto hover:bg-panelBlue flex-col">
          {/* @ts-ignore */}
          <LocalCity weatherData={localCity} />
          {/* @ts-ignore */}
          {localCity.cod === 429 && (
            <div className="text-red-500 bg-red-50 p-2">{error}</div>
          )}
        </div>
        <h1 className="my-10">Australia Capital Cities</h1>
        <div
          className={clsx(
            'w-3/4 flex flex-col justify-center m-auto mt-8 gap-2',
            'md:flex md:flex-row md:gap-5 md:w-3/4',
            'lg:flex lg:flex-row lg:gap-5 lg:w-3/4 flex-wrap',
            'xl:lg:flex xl:flex-row xl:gap-5 xl:w-3/4 xl:flex-nowrap'
          )}
        >
          {cities.map(({ name, id, conditions, temp }) => (
            <Cities key={id} name={name} temp={temp} conditions={conditions} />
          ))}
        </div>
      </div>
    </div>
  )
}
