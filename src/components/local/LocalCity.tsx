import clsx from 'clsx'
import Panel from '../reusable_components/Panel'

type localProps = {
  weatherData: {
    description: string
    icon: string
    name: string
    temp: string
  }
}
export default function LocalCity({ weatherData }: localProps) {
  return (
    <Panel>
      <div
        className={clsx(
          'w-full p-14 flex flex-col border-2 border-panelBorder overlay',
          'md:p-8',
          'lg: p-8'
        )}
      >
        <h1>{weatherData.name}</h1>
        {/* <h1>{temp}</h1>
        <h2>{conditions}</h2> */}
      </div>
    </Panel>
  )
}
