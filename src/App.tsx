import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import clsx from 'clsx'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  // const backgroundPic = localCity?.weather[0].main.toLowercase()

  return (
    <div
      className={clsx(
        'text-center bg-no-repeat bg-cover bg-sunny min-h-screen'
      )}
    >
      <DndProvider backend={HTML5Backend}>
        <Dashboard />
      </DndProvider>
    </div>
  )
}

export default App
