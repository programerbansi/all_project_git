import React from 'react'
import logo from '../../assets/logo.png'

const Header = () => {
    return (
        <>
         
            <div className='grid grid-rows-1 grid-flow-col pt-6 pb-4'>
                <div className='flex justify-evenly items-center'>
                    <img src={logo}></img>
                    <ul className='list-none flex text-15px gap-6 font-poppins font-semibold tracking-widest text-slate-700 cursor-pointer'>
                        <li className='hover:text-gray-400'>Home</li>
                        <li className='hover:text-gray-400'>Men's</li>
                        <li className='hover:text-gray-400'>Women's</li>
                        <li className='hover:text-gray-400'>Kid's</li>
                        <li className='hover:text-gray-400'>
                            <div className="relative group inline-block text-left ">
                                <div>
                                    <button type="button" className="" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        <span className='flex'>Pages <svg className="h-4 w-4 mt-1 text-slate-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg></span>
                                    </button>
                                </div>
                                <div className="absolute  transition-all ease-in-out duration-500 left-0 z-10 w-40 group-hover:opacity-100 opacity-0 origin-top-right bg-gray-50  shadow font-poppins text-gray-600" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                    <div className="py-1" role="none">
                                        <a href="#" className="block hover:bg-white px-4 py-2 text-13px border-b" role="menuitem" tabIndex={-1} id="menu-item-0"><span className='hover:ml-1'>About Us</span></a>
                                        <a href="#" className="block hover:bg-white px-4 py-2 text-13px border-b" role="menuitem" tabIndex={-1} id="menu-item-1"><span className='hover:ml-1'>Products</span></a>
                                        <a href="#" className="block hover:bg-white px-4 py-2 text-13px border-b" role="menuitem" tabIndex={-1} id="menu-item-2"><span className='hover:ml-1'>Single Product</span></a>
                                        <a href="#" className="block hover:bg-white px-4 py-2 text-13px" role="menuitem" tabIndex={-1} id="menu-item-3"><span className='hover:ml-1'>Contact Us</span></a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className='hover:text-gray-400'> <div className="relative group inline-block text-left ">
                            <div>
                                <button type="button" className="" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    <span className='flex'>Feature <svg className="h-4 w-4 mt-1 text-slate-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg></span>
                                </button>
                            </div>
                            <div className="absolute transition-all ease-in-out duration-500 group-hover:opacity-100 opacity-0 left-0 z-10 w-40  origin-top-right bg-gray-50  shadow font-poppins text-gray-600" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                <div className="py-1" role="none">
                                    <a href="#" className="block hover:bg-white px-4 py-2 text-13px border-b" role="menuitem" tabIndex={-1} id="menu-item-0"><span className='hover:ml-1'>Features Page 1</span></a>
                                    <a href="#" className="block hover:bg-white px-4 py-2 text-13px border-b" role="menuitem" tabIndex={-1} id="menu-item-1"><span className='hover:ml-1'>Features Page 2</span></a>
                                    <a href="#" className="block hover:bg-white px-4 py-2 text-13px border-b" role="menuitem" tabIndex={-1} id="menu-item-2"><span className='hover:ml-1'>Features Page 3</span></a>
                                    <a href="#" className="block hover:bg-white px-4 py-2 text-13px" role="menuitem" tabIndex={-1} id="menu-item-3"><span className='hover:ml-1'>Features Page 4</span></a>

                                </div>
                            </div>
                        </div></li>
                        <li className='hover:text-gray-400'>Explore</li>
                    </ul>
                </div>
            </div>
            <div className='border-dotted border-b-3 w-full '></div>
        </>
    )
}

export default Header