import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { BlogCard } from "./BlogCard"
import { useAppContext } from '../context/AppProvider'
import axios from 'axios'

export const BlogList = () => {
  const [menu, setMenu] = useState('All')
  const { blogs, input } = useAppContext()
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/category/all')
        if (res.data.success) {
          setCategories(['All', ...res.data.categories.map(cat => cat.name)])
        } else {
          setCategories(['All']) // fallback
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err.message)
        setCategories(['All']) // fallback
      } finally {
        setLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  // Step 1: filter by search input
  const searchFilteredBlogs = blogs.filter(blog =>
    input === "" ||
    blog.title.toLowerCase().includes(input.toLowerCase()) ||
    blog.category.toLowerCase().includes(input.toLowerCase())
  )

  // Step 2: filter by category menu
  const finalBlogs = searchFilteredBlogs.filter(blog =>
    menu === "All" || blog.category === menu
  )

  return (
    <div className='dark:bg-gray-900 dark:text-white'>
      {/* Section 1: category buttons */}
      <div className='flex justify-center gap-4 sm:gap-8 py-10 relative flex-wrap'>
        {loadingCategories ? (
          <p className='text-center text-gray-500'>Loading categories...</p>
        ) : (
          categories.map((item) => (
            <div key={item} className="relative">
              <button
                onClick={() => setMenu(item)}
                className={`relative cursor-pointer text-gray-500 dark:text-gray-300
                  ${menu === item ? 'text-white px-4 pt-0.5' : ''}`}
              >
                <span className='relative z-10'>{item}</span>

                {menu === item && (
                  <motion.div
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute inset-0 h-7 z-0 rounded-full bg-primary dark:bg-primary"
                  />
                )}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Section 2: blog cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 pb-24 mx-8 sm:mx-16 xl:mx-40'>
        {finalBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  )
}
