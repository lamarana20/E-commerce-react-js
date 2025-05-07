import React from 'react'

const NewLetters = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert("submitted")
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-600'>Subscribe now  & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
        </p>
        <form  onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center mx-auto gap-4 my-6 border pl-3'>
            <input type='email' placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required/>
            <button className='bg-black text-white px-10 py-4 text-xs '>Subscribe</button>
        </form>
      
    </div>
  )
}

export default NewLetters
