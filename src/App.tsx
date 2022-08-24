import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useContext, useEffect, useState } from 'react'
import { LocalCityContext } from '../src/context/LocalCityContext'
import clsx from 'clsx'
import Dashboard from './pages/Dashboard'
import Spinner from './components/reusable_components/Spinner'

function App() {
  const { error, isLoading, localCity } = useContext(LocalCityContext)

  useEffect(() => {
    const backgroundPic = localCity?.weather[0].main
    setWeather(backgroundPic)
  }, [localCity])

  const [weather, setWeather] = useState<string>('')

  console.log(weather)

  if (!localCity) {
    return <Spinner />
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={clsx(
          `text-center bg-no-repeat bg-${weather} bg-cover min-h-screen`
        )}
      >
        <Dashboard />
      </div>
    </DndProvider>
  )
}

export default App
