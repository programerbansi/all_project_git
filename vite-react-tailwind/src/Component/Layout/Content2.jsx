import React from 'react'
import men1 from '../../assets/men-01.jpg'
import men2 from '../../assets/men-02.jpg'
import men3 from '../../assets/men-03.jpg'
import { FaEye, FaStar, FaShoppingCart } from "react-icons/fa";
const Content2 = () => {
    let defaultTransform = 0;
    function goNext() {
        defaultTransform = defaultTransform - 400;
        var slider = document.getElementById("slider");
        if (Math.abs(defaultTransform) >= slider.scrollWidth / 1.7) defaultTransform = 0;
        slider.style.transform = "translateX(" + defaultTransform + "px)";
    }
    // next.addEventListener("click", goNext);
    function goPrev() {
        var slider = document.getElementById("slider");
        if (Math.abs(defaultTransform) === 0) defaultTransform = 0;
        else defaultTransform = defaultTransform + 400;
        slider.style.transform = "translateX(" + defaultTransform + "px)";
    }
    // prev.addEventListener("click", goPrev);

    return (
        <>

            <div className="container mx-auto pl-48">

                <div className=''>
                    <div className='mt-20 '>
                        <h1 className='text-34px font-bold text-gray-800'>Men's Latest</h1>
                        <p className='text-gray-400 italic text-16px'>Details to details is what makes Hexashop different from the other themes.</p>
                    </div>
                    <div className="flex items-center justify-center w-full h-full py-24 pr-46 sm:py-8 my-5">
                        <div className="w-full relative flex items-center justify-center">
                            <button onClick={() => { goPrev() }} aria-label="slide backward" className="absolute z-30 left-0 p-4 border border-1 border-black -ml-20 cursor-pointer" id="prev">
                                <svg className="hover:text-black text-slate-500" width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                                <div id="slider" className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                    <div className="flex flex-col flex-shrink-0 w-full sm:w-auto group">
                                        <div className="relative">
                                            <img src={men1} alt="black chair and white table" className="object-cover object-center w-full" />
                                            <div className="absolute group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-500 top-2/3 w-full h-full p-6 z-12">
                                                <ul className='flex justify-evenly'>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaEye /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaStar /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaShoppingCart /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between mt-5'>
                                            <h4 className='text-24px font-bold text-zinc-800'>Classic Spring</h4>
                                            <ul className='flex text-zinc-800'>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                            </ul>
                                           
                                        </div>
                                        <span className='text-gray-400 text-18px font-bold'>$120.00</span>
                                    </div>
                                    <div className="flex flex-col flex-shrink-0 w-full sm:w-auto group">
                                        <div className="relative">
                                            <img src={men1} alt="black chair and white table" className="object-cover object-center w-full" />
                                            <div className="absolute group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-500 top-2/3 w-full h-full p-6 z-12">
                                                <ul className='flex justify-evenly'>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaEye /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaStar /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaShoppingCart /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between mt-5'>
                                            <h4 className='text-24px font-bold text-zinc-800'>Classic Spring</h4>
                                            <ul className='flex text-zinc-800'>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                            </ul>
                                           
                                        </div>
                                        <span className='text-gray-400 text-18px font-bold'>$120.00</span>
                                    </div>
                                    <div className="flex flex-col flex-shrink-0 w-full sm:w-auto group">
                                        <div className="relative">
                                            <img src={men1} alt="black chair and white table" className="object-cover object-center w-full" />
                                            <div className="absolute group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-500 top-2/3 w-full h-full p-6 z-12">
                                                <ul className='flex justify-evenly'>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaEye /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaStar /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaShoppingCart /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between mt-5'>
                                            <h4 className='text-24px font-bold text-zinc-800'>Classic Spring</h4>
                                            <ul className='flex text-zinc-800'>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                            </ul>
                                           
                                        </div>
                                        <span className='text-gray-400 text-18px font-bold'>$120.00</span>
                                    </div>
                                    <div className="flex flex-col flex-shrink-0 w-full sm:w-auto group">
                                        <div className="relative">
                                            <img src={men1} alt="black chair and white table" className="object-cover object-center w-full" />
                                            <div className="absolute group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-500 top-2/3 w-full h-full p-6 z-12">
                                                <ul className='flex justify-evenly'>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaEye /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaStar /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaShoppingCart /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between mt-5'>
                                            <h4 className='text-24px font-bold text-zinc-800'>Classic Spring</h4>
                                            <ul className='flex text-zinc-800'>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                            </ul>
                                           
                                        </div>
                                        <span className='text-gray-400 text-18px font-bold'>$120.00</span>
                                    </div>
                                    <div className="flex flex-col flex-shrink-0 w-full sm:w-auto group">
                                        <div className="relative">
                                            <img src={men1} alt="black chair and white table" className="object-cover object-center w-full" />
                                            <div className="absolute group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-500 top-2/3 w-full h-full p-6 z-12">
                                                <ul className='flex justify-evenly'>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaEye /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaStar /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaShoppingCart /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between mt-5'>
                                            <h4 className='text-24px font-bold text-zinc-800'>Classic Spring</h4>
                                            <ul className='flex text-zinc-800'>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                            </ul>
                                           
                                        </div>
                                        <span className='text-gray-400 text-18px font-bold'>$120.00</span>
                                    </div>
                                    <div className="flex flex-col flex-shrink-0 w-full sm:w-auto group">
                                        <div className="relative">
                                            <img src={men1} alt="black chair and white table" className="object-cover object-center w-full" />
                                            <div className="absolute group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-500 top-2/3 w-full h-full p-6 z-12">
                                                <ul className='flex justify-evenly'>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaEye /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaStar /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaShoppingCart /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between mt-5'>
                                            <h4 className='text-24px font-bold text-zinc-800'>Classic Spring</h4>
                                            <ul className='flex text-zinc-800'>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                            </ul>
                                           
                                        </div>
                                        <span className='text-gray-400 text-18px font-bold'>$120.00</span>
                                    </div>
                                    <div className="flex flex-col flex-shrink-0 w-full sm:w-auto group">
                                        <div className="relative">
                                            <img src={men1} alt="black chair and white table" className="object-cover object-center w-full" />
                                            <div className="absolute group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-500 top-2/3 w-full h-full p-6 z-12">
                                                <ul className='flex justify-evenly'>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaEye /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaStar /></a></li>
                                                    <li className='bg-white w-fit p-4'><a href="single-product.html"><FaShoppingCart /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between mt-5'>
                                            <h4 className='text-24px font-bold text-zinc-800'>Classic Spring</h4>
                                            <ul className='flex text-zinc-800'>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                                <li className=''><a href="single-product.html"><FaStar /></a></li>
                                            </ul>
                                           
                                        </div>
                                        <span className='text-gray-400 text-18px font-bold'>$120.00</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => { goNext() }} aria-label="slide forward" className="absolute z-30 right-0 -mr-16 p-4 border border-1 border-black " id="next">
                                <svg className="hover:text-black text-slate-500" width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>






        </>
    )
}

export default Content2