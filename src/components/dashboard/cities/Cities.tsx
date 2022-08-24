import type { Identifier, XYCoord } from 'dnd-core'
import { FC, useState } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../../types/itemTypes'

import clsx from 'clsx'
import Panel from '../../reusable_components/Panel'
import Spinner from '../../reusable_components/Spinner'
import { CityProps } from '../../../types/types'

type cityProps = {
  cityData: {
    description: string
    name: string
    id: number
    weather: [{ description: string; icon: string }]
    main: { temp: number }
  }
  index: number
  draggableContent: CityProps[]
}
interface DragItem {
  index: number
  id: string
  type: string
}

interface DropResult {
  name: string
}
export default function LocalCity({ cityData, draggableContent }: cityProps) {
  const [hasDropped, setHasDropped] = useState(false)

  const id = cityData.id

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: ItemTypes.CARD,
    item: {
      type: ItemTypes.CARD,
      id,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        const content = [...draggableContent]

        setHasDropped(true)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  })

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  if (!cityData || !cityData.weather) {
    return <Spinner />
  }

  const weatherIcon = `http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`
  const temp = cityData.main.temp.toFixed(0)

  return (
    <div ref={drag} className="cursor-pointer">
      <Panel>
        <div ref={drop} className="md:flex md:h-full">
          <div
            ref={dragPreview}
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
    </div>
  )
}
