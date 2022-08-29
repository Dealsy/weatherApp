import { useContext, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { LocalCityContext } from '../src/context/LocalCityContext'
import Spinner from './components/reusable_components/Spinner'
import Dashboard from './pages/Dashboard'

function App() {
  const { localCity } = useContext(LocalCityContext)

  /* 
  
  Here we are using useContext to pass in Local City Data,
  then we check to see if there is a weather condition, if there is,
  we pass that to a useState and use it to dynamically update the background image,
  of the Dashboard component.   

  */

  useEffect(() => {
    const backgroundPic = localCity?.weather[0].main
    setWeather(backgroundPic)
  }, [localCity])

  const [weather, setWeather] = useState<string>('')

  if (!localCity) {
    return <Spinner />
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="text-center bg-no-repeat bg-cover min-h-screen"
        style={{
          backgroundImage: `url(/images/Drizzle.jpg)`,
        }}
      >
        <Dashboard />
      </div>
    </DndProvider>
  )
}

export default App
