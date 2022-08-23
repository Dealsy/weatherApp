import clsx from 'clsx'

export default function Spinner() {
  return (
    <div
      className={clsx(
        'w-24 h-24 border-[0.3rem] animate-spin rounded-full',
        'border-darkGray border-r-purple-600 rotate'
      )}
    />
  )
}
