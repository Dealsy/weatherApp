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
      <Dashboard />
    </div>
  )
}

export default App
