export type localProps = {
  weatherData: mainProps
}

export type cityProps = {
  list: mainProps[]
  cod?: number
  index: number
}

export type cityDataProps = {
  cityData: mainProps
}

export type mainProps = {
  description: string
  name: string
  weather: [{ description: string; icon: string }]
  main: { temp: number }
  id: number
}
