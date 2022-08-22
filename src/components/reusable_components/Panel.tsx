import clsx from 'clsx'
import React from 'react'

type PanelProps = {
  children: React.ReactNode
}

export default function Panel({ children }: PanelProps) {
  return (
    <div
      className={clsx(
        'text-white bg-panelBlue opacity-70',
        'shadow border-1 border-panelBorder mb-1 '
      )}
    >
      {children}
    </div>
  )
}
