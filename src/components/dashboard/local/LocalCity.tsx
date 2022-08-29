import clsx from 'clsx'

import { localProps } from '../../../types/types'
import Panel from '../../reusable_components/Panel'
import Spinner from '../../reusable_components/Spinner'

export default function LocalCity({ weatherData }: localProps) {
  if (!weatherData || !weatherData.weather) {
    return <Spinner />
  }

  const weatherIcon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  const temp = weatherData.main.temp.toFixed(0)
  return (
    <Panel>
      <div
        className={clsx(
          'w-full p-14 flex flex-col border-2 justify-center border-panelBorder overlay h-96 ',
          'md:rounded-lg'
        )}
      >
        <h1 className={clsx('m-autorounded-lg w-full mt-5')}>Your Location</h1>
        <h2>{weatherData.weather[0].description}</h2>
        <span className="text-6xl font-semibold">{temp} °C</span>
        <h2 className="mt-5">{weatherData.name}</h2>
        <img className="w-32 m-auto" src={weatherIcon} alt="weather_icon" />
      </div>
    </Panel>
  )
}
