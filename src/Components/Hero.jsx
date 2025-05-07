import React from 'react'

const Hero = () => {
  return (
    <>
    <div className='flex flex-col sm:flex-row  mt-10 border border-gray-200'>
        {/* Left Side */}
        <div className='w-full sm:w-1/2 flex justify-center items-center py-8 sm:py-0'>
        <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
                <p className='w-8  md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Lastest Arrivals</h1>
            <div className='flex items-center gap-2'>
                <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                <p className='w-8  md:w-11 h-[1px] bg-[#414141]'></p>

            </div>

        </div>
        </div>
        {/* Right Side */}
            <div className='w-full sm:w-1/2'>
                <img 
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Online Shopping Hero"
                    className="w-full h-full object-cover"
                />
                
            </div>
    </div>
    </>
  )
}


export default Hero
