import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { assets, blog_data, comments_data } from '../assets/assets'
import { NavBar, Footer, Loader } from "../components/indexComponents"
import Moment from "moment"
import { useAppContext } from '../context/AppProvider'
import toast from 'react-hot-toast'

//individual blog page

/*At first we are using blog_data from assets.js to construct the ui. later we will replace it with mongoDB */

export const BlogDetail = () => {

    const { id } = useParams() //getting the id of the blog

    const { axios, setDarkMode, darkMode } = useAppContext() //getting axios from context

    const [data, setData] = useState(null)

    const [comments, setComments] = useState([])


    {/*these 2 states is for the comment box (name) and (comment) fields */ }
    const [name, setName] = useState('')
    const [content, setContent] = useState('')



    /*we are using asynchronous function to get the data from future fetch operations that will happen here.And in the requiredData, we are finding the individual blog data clicked, by comparing the id obtained from the params and the array of blog_data */
    const fetchBlogData = async () => {

        try {
            const { data } = await axios.get(`api/blog/${id}`) //getting individual blog data from api
            data.success ? setData(data.blog) : toast.error(data.message)
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    {/*In the assets we have given same comments for all blogs for time being lets keep that as placeholder. now when u came back after building backend u know what happens here*/ }
    const fetchComments = async () => {
        try {
            const { data } = await axios.get(`api/blog/comments/${id}`) //getting individual blog data from api

            data.success ? setComments(data.comments) : toast.error(data.message)

        }
        catch (error) {
            toast.error(error.message)
        }
    }

    // here we use useEffect to run the fetchFunctions whenever screen loads

    const addComment = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('api/blog/add-comment', { blog: id, name, content })

            if (data.success) {
                toast.success(data.message)
                setName("")
                setContent("")
                await fetchComments()
            } else {
                toast.error(data.message)
            }

        }
        catch (error) {
            toast.error(error.message)
        }
    }
    /*Now all the changes for the individual page is done lets move on to admin page */

    useEffect(() => {
        fetchBlogData()
        fetchComments()
    }, [])

    // here we are giving out actual response onlu if data exists

    return data ? (
        <main>
            <div className='relative dark:bg-gray-900 dark:text-white'>

                <NavBar />
                <img src={darkMode === true ? assets.darkGradientBackground : assets.gradientBackground} alt="" className=' absolute top-20 -z-1 opacity-80 ' />
                <div className=' text-center mt-20 text-gray-600 dark:text-gray-300 '>
                {/*Section 1 (title,small description and date). And here we are going to use moment npm to display the date MMMM- Complete month, Do- Date of , YYYY - year number*/}
                    <p className=' text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
                    <h1 className=' text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 dark:text-white'>{data.title}</h1>
                    <h2 className=' my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
                    <p className=' inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Mohammed Wajid Khan</p>
                </div>

                {/*Section 2 image of blog, description, comment,comment box and the social media icon */}
                <div className=' mx-5 max-w-5xl md:mx-auto my-10 mt-6'>

                    <img src={data.image} alt="" className='rounded-3xl mb-5' />

                    {/*The rich-text class is added from the index.css */}
                    <div className=' rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: data.description }}>

                    </div>

                    {data.pdfFiles && data.pdfFiles.length > 0 && (
                        <div className=' max-w-3xl mx-auto mt-8'>
                            <p className=' font-semibold mb-4'>Attached Files</p>
                            <ul className=' list-disc pl-5 text-blue-600 dark:text-blue-400'>
                                {data.pdfFiles.map((file, index) => (
                                    <li key={index} className=' mb-2'>
                                        <a href={file.url} target="_blank" rel="noopener noreferrer" className=' underline'>
                                            📄 {file.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}


                    {/*Comments section */}

                    <div className=' mt-14 mb-10 max-w-3xl mx-auto'>
                        <p className=' font-semibold mb-4'>Comments ({comments.length})</p>
                        <div className=' flex flex-col gap-4'>
                            {comments.map((item, index) => {
                                return (
                                    <div key={index} className=' relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600 dark:text-gray-300'>

                                        <div>
                                            <img src={assets.user_icon} alt="" className='w-6' />

                                            <p value={name} className='font-medium'>{item.name}</p>
                                        </div>
                                        <p className=' text-sm max-w-md mb-5 '>{item.content}</p>
                                        <div className=' absolute right-4 bottom-3 flex items-center gap-2 text-xs'> {Moment(item.createdAt).fromNow()}</div>
                                    </div>)
                            })}
                        </div>


                    </div>

                    {/*Comment Box still inside 2nd section */}
                    <div className=' max-w-3xl mx-auto'>
                        <p className=' font-semibold mb-4'>Add Your Comment</p>

                        <form onSubmit={addComment} className=' flex flex-col items-start gap-4 max-w-lg'>

                            <input onChange={((e) => setName(e.target.value))} type="text"
                                value={name}
                                placeholder='Name' required className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-white' />

                            <textarea onChange={((e) => setContent(e.target.value))}
                                value={content}
                                className=" w-full p-2 border border-gray-300 dark:border-gray-700 rounded outline-none h-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-white" required placeholder='Comment'></textarea>

                            <button type="submit" className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer '>Submit</button>
                        </form>
                    </div>


                    {/*Share Buttons Still inside section 2*/}

                    <div className=' my-24 max-w-3xl mx-auto'>
                        <p className=' font font-semibold my-4 '> Share this article on social media</p>

                        <div className=' flex '>
                            <img src={assets.facebook_icon} width={50} alt="" />
                            <img src={assets.twitter_icon} width={50} alt="" />
                            <img src={assets.googleplus_icon} width={50} alt="" />
                        </div>
                    </div>

                    <Footer />


                </div>

            </div>
        </main>
    ) : (<Loader />)
}
