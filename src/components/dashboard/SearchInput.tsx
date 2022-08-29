import clsx from 'clsx'

type searchProps = {
  handleSubmit: (e: any) => void
  handleChange: (e: any) => void
  citySearch: string
  clearSearch: () => void
}

export default function SearchInput({
  handleSubmit,
  handleChange,
  citySearch,
  clearSearch,
}: searchProps) {
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <label
          className={clsx(
            'text-sm text-white p-2 font-bold text-gray-000 mt-5 flex justify-start overlay',
            'md:ml-0.5 md:w-1/4 md:rounded'
          )}
        >
          Search for a city
        </label>
        <input
          type="text"
          placeholder="Search"
          className={clsx('p-2 rounded-l-lg', 'md:w-102')}
          onChange={handleChange}
        />
        <input
          className={clsx(
            'bg-gray-100 p-2 rounded-r-lg text-black font-bold mb-2',
            'hover:border-2 hover:border-gray-200'
          )}
          type="submit"
          value="add"
        />
        {citySearch !== '' ? (
          <button
            className={clsx(
              'bg-gray-100 p-2 rounded-lg text-black font-bold mb-2 ml-5',
              'hover:border-2 hover:border-gray-200'
            )}
            type="button"
            onClick={clearSearch}
          >
            Back to your location
          </button>
        ) : null}
      </form>
    </div>
  )
}
