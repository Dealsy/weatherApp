import clsx from 'clsx'

import { searchProps } from '../../../types/types'
import Panel from '../../reusable_components/Panel'
import Spinner from '../../reusable_components/Spinner'

export default function GlobalSearch({ searchData }: searchProps) {
  if (!searchData || !searchData.weather) {
    return (
      <div className="text-red-500 bg-red-50 p-2 w-full font-bold">
        City not found, try and search for another City
      </div>
    )
  }

  const weatherIcon = `http://openweathermap.org/img/wn/${searchData.weather[0].icon}@2x.png`
  const temp = searchData.main.temp.toFixed(0)
  return (
    <Panel>
      <div
        className={clsx(
          'w-full p-14 flex flex-col border-2 justify-center border-panelBorder overlay ',
          'md:p-8 md:rounded-lg',
          'lg: p-8 '
        )}
      >
        <h2>{searchData.weather[0].description}</h2>
        <span className="text-7xl m-5 font-semibold">{temp} °C</span>
        <img className="w-32 m-auto" src={weatherIcon} alt="weather_icon" />
      </div>
    </Panel>
  )
}
