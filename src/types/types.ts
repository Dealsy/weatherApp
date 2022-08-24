export type weatherProps = {
  description: string
  name: string
  weather: [{ description: string; icon: string; main: string }]
  main: { temp: number }
  cod: number
  id: number
}

export type CityProps = {
  list: [
    {
      description: string
      name: string
      weather: [{ description: string; icon: string }]
      main: { temp: number }
      id: number
    }
  ]
  cod: number
}
