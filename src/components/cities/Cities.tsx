import clsx from 'clsx'
import Panel from '../reusable_components/Panel'
import Spinner from '../reusable_components/Spinner'

type cityProps = {
  cityData: {
    description: string
    name: string
    weather: [{ description: string; icon: string }]
    main: { temp: number }
  }
}

export default function LocalCity({ cityData }: cityProps) {
  if (!cityData || !cityData.weather) {
    return <Spinner />
  }

  const weatherIcon = `http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`
  const temp = cityData.main.temp.toFixed(0)
  console.log(weatherIcon)

  return (
    <Panel>
      <div className="md:flex md:h-full">
        <div
          className={clsx(
            'p-3 text-white border-2 border-panelBorder overlay hover:bg-panelBlue',
            'md:w-60 md:p-8'
          )}
        >
          <div className="md:flex md:flex-col md:h-32">
            <h1>{cityData.name}</h1>
            <span className="font-semibold my-2">{temp} °C</span>
            <h3>{cityData.weather[0].description}</h3>
          </div>

          <img
            className="w-20 m-auto mt-5"
            src={weatherIcon}
            alt="weather_icon"
          />
        </div>
      </div>
    </Panel>
  )
}
