import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppProvider'

export const Header = () => {
  const { setInput, input, darkMode } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const searchTerm = inputRef.current.value.trim()
    if (searchTerm) {
      setInput(searchTerm)
    }
  }

  const onClear = () => {
    setInput("")
    inputRef.current.value = ""
  }

  return (
    <div className="bg-white border-t border-t-gray-600 text-gray-800 dark:bg-gray-900 dark:text-white relative z-10">
      <div className="mx-8 sm:mx-16 xl:mx-24 relative">

        <div className="text-center pt-20 pb-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-4 border border-primary/40 bg-primary/10 dark:bg-primary/20 rounded-full text-xs sm:text-sm text-primary">
            <p>New: AI feature integrated</p>
            <img src={assets.star_icon} className="w-3" alt="star" />
          </div>

          {/* Header content */}
          <div className="py-10 sm:py-16 px-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-800 dark:text-white mb-4">
              Academic <span className="text-primary">Blog & Notes</span> Collection
            </h1>

            <p className="mt-2 text-lg sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200">
              Dr. Mohammed Wajid Khan
            </p>

            <p className="mt-1 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
              Assistant Professor, Department of Information Technology
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6">
              B.Tech.,M.Tech.,Ph.D.
            </p>

            <p className="max-w-3xl mx-auto text-center text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed border-t border-b border-gray-200 dark:border-gray-700 py-6">
              Sharing curated lecture notes, research articles, and academic resources — thoughtfully crafted to support learning, encourage curiosity, and advance technical expertise.
            </p>
          </div>

          {/* Search box */}
          <form
            onSubmit={onSubmitHandler}
            className="flex justify-between max-w-lg mx-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded overflow-hidden mt-4"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for blogs"
              className="w-full px-4 py-2 bg-transparent text-gray-800 dark:text-white outline-none"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 hover:scale-105 transition-all"
            >
              Search
            </button>
          </form>

          {/* Clear button */}
          {input && (
            <div className="text-center mt-2">
              <button
                onClick={onClear}
                className="border border-gray-300 dark:border-gray-600 text-xs px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Background gradient */}
        <img
          src={assets.gradientBackground}
          alt="background"
          className={`absolute -bottom-1 left-0 right-0 w-full -z-10 opacity-80`}
        />
      </div>
    </div>
  )
}
