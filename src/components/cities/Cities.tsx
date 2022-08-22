import clsx from 'clsx'
import Panel from '../reusable_components/Panel'

type cityProps = {
  conditions: string
  name: string
  temp: string
}

export default function LocalCity({ name, temp, conditions }: cityProps) {
  return (
    <Panel>
      <div
        className={clsx(
          'p-3 text-white border-2 border-panelBorder overlay hover:bg-panelBlue',
          'md:w-48 md:p-8'
        )}
      >
        <h2>{name}</h2>
        <h1>{temp}</h1>
        <label>{conditions}</label>
      </div>
    </Panel>
  )
}
