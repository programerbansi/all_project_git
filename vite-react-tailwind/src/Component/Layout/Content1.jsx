import React from 'react'
import left from '../../assets/left-banner-image.jpg'
import right1 from '../../assets/baner-right-image-01.jpg'
import right2 from '../../assets/baner-right-image-02.jpg'
import right3 from '../../assets/baner-right-image-03.jpg'
import right4 from '../../assets/baner-right-image-04.jpg'

const Content1 = () => {
    return (
        <>
        
            <div className='grid grid-rows-2 gap-6 grid-flow-col auto-cols-max  grid-cols-3 py-16 px-5'>
                <div className='relative row-span-2 col-span-2'>
                    <div className='absolute z-10 text-white ml-20'>
                        <h1 className='mt-80 text-52px font-bold'>We Are Hexashop</h1>
                        <h1 className='mt-4 text-16px italic'>Awesome, clean & creative HTML5 Template</h1>
                        <button className='transition ease-in-out delay-150 bg-transparent hover:bg-white hover:text-black border border-1 px-4 py-2 mt-9'>Purchase Now!</button>
                    </div>
                    <img className='w-full h-full object-fill' src={left}></img>
                </div>
                <div className='relative group '>
                    <div className='absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white'>
                        <h1 className='text-24px font-extrabold'>Women</h1>
                        <h1 className='text-17px italic mt-3'>Best Clothes For Women</h1>
                    </div>
                    <div className="absolute group-hover:opacity-100 opacity-0  z-20 bg-zinc-800/90 w-5/6 h-5/6 m-9 transition-all ease-in-out duration-500">
                        <div className='absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white '>
                            <h1 className='text-24px font-extrabold'>Women</h1>
                            <p className='mt-2'>Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid.</p>
                            <button className=' transition ease-in-out delay-150 bg-transparent text-sm hover:bg-white hover:text-black border border-1 px-4 py-2 mt-6 '>Discover More</button>
                        </div>
                    </div>
                    <img className=' w-full h-full object-fill' src={right1}></img>
                </div>
                <div className='relative group'>
                    <div className='absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white'>
                        <h1 className='text-24px font-extrabold'>Kids</h1>
                        <h1 className='text-18px italic mt-3'>Best Clothes For Kids</h1>
                    </div>
                    <div className="absolute group-hover:opacity-100 opacity-0  z-20 bg-zinc-800/90 w-5/6 h-5/6 m-9 transition-all ease-in-out duration-500 ">
                        <div className='absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
                            <h1 className='text-24px font-extrabold'>Kids</h1>
                            <p className='mt-2'>Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid.</p>
                            <button className=' transition ease-in-out delay-150 bg-transparent text-sm hover:bg-white hover:text-black border border-1 px-4 py-2 mt-6'>Discover More</button>
                        </div>
                    </div>
                    <img className=' w-full h-full object-fill' src={right3}></img>
                </div>
                <div className='relative group'>
                    <div className='absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white'>
                        <h1 className='text-24px font-extrabold'>Men</h1>
                        <h1 className='text-18px italic mt-3'>Best Clothes For Men</h1>
                    </div>
                    <div className="absolute group-hover:opacity-100 opacity-0  z-20 bg-zinc-800/90 w-5/6 h-5/6 m-9 transition-all ease-in-out duration-500 ">
                        <div className='absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
                            <h1 className='text-24px font-extrabold'>Men</h1>
                            <p className='mt-2'>Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid.</p>
                            <button className='transition ease-in-out delay-150 bg-transparent text-sm hover:bg-white hover:text-black border border-1 px-4 py-2 mt-6'>Discover More</button>
                        </div>
                    </div>
                    <img className=' w-full h-full object-fill' src={right2}></img>
                </div>
                <div className='relative group'>
                    <div className='absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white'>
                        <h1 className='text-24px font-extrabold'>Accessories</h1>
                        <h1 className='text-18px italic mt-3'>Best Trend Accessories</h1>
                    </div>
                    <div className="absolute group-hover:opacity-100 opacity-0  z-20 bg-zinc-800/90 w-5/6 h-5/6 m-9 transition-all ease-in-out duration-500 ">
                        <div className='absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
                            <h1 className='text-24px font-extrabold'>Accessories</h1>
                            <p className='mt-2'>Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid.</p>
                            <button className='transition ease-in-out delay-150 bg-transparent text-sm hover:bg-white hover:text-black border border-1 px-4 py-2 mt-6'>Discover More</button>
                        </div>
                    </div>
                    <img className=' w-full h-full object-fill' src={right4}></img>
                </div>

            </div>
            <div className='border-dotted border-b-3 w-full '></div>
        </>
    )
}

export default Content1