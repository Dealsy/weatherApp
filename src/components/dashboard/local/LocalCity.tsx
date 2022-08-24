import clsx from 'clsx'
import Panel from '../../reusable_components/Panel'
import Spinner from '../../reusable_components/Spinner'

type localProps = {
  weatherData: {
    description: string
    name: string
    weather: [{ description: string; icon: string }]
    main: { temp: number }
  }
}
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
          'w-full p-14 flex flex-col border-2 justify-center border-panelBorder overlay ',
          'md:p-8 md:rounded-lg',
          'lg: p-8 '
        )}
      >
        <h2>{weatherData.weather[0].description}</h2>
        <span className="text-7xl m-5 font-semibold">{temp} °C</span>
        <h1>{weatherData.name}</h1>
        <img className="w-32 m-auto" src={weatherIcon} alt="weather_icon" />
      </div>
    </Panel>
  )
}
