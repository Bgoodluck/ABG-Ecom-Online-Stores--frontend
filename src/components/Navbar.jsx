import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'



function Navbar() {

    const [visible, setVisible] = useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, usernames, profileImage, backendUrl } = useContext(ShopContext);


    const logout = ()=>{       
        localStorage.removeItem('token')
        setToken('');
        setCartItems({})   
        navigate('/login')     
    }


    console.log("Usernames:", usernames);
    console.log("Profile Image:", profileImage);


  return (
    <div className=' flex items-center justify-between py-5 font-medium'>

        <Link to='/'><img src={assets.logo2} className=' w-24 h-24 rounded-full' alt="" /></Link>

        <ul className=' hidden sm:flex gap-5 text-sm text-gray-700'>
          
          <NavLink to='/' className='flex flex-col items-center gap-1'>
             <p>HOME</p>
             <hr className=' w-2/4 border-none h-[1.5px] bg-[#fd3da1] hidden' />
          </NavLink>
          <NavLink to='/collection' className='flex flex-col items-center gap-1'>
             <p>COLLECTION</p>
             <hr className=' w-2/4 border-none h-[1.5px] bg-[#fd3da1] hidden' />
          </NavLink>
          <NavLink to='/about' className='flex flex-col items-center gap-1'>
             <p>ABOUT</p>
             <hr className=' w-2/4 border-none h-[1.5px] bg-[#fd3da1] hidden' />
          </NavLink>
          <NavLink to='/contact' className='flex flex-col items-center gap-1'>
             <p>CONTACT</p>
             <hr className=' w-2/4 border-none h-[1.5px] bg-[#fd3da1] hidden' />
          </NavLink>
          
        </ul>
        <div className=' flex items-center gap-6'>
            <img onClick={()=> setShowSearch(true)} src={assets.search_icon} className=' w-5 cursor-pointer' alt="" />

            <div className=' group relative'>
            <img 
                    onClick={() => token ? null : navigate('/login')} 
                    src={profileImage}  
                    className='w-14 h-14 rounded-full cursor-pointer object-fit' 
                    alt="" 
                />
                {/* this is the code for the dropdown below */}
                {
                    token && (
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                {/* Display username */}
                                {usernames && <p className='text-sm text-gray-700'>Hi, {usernames}!</p>}
                                <Link to='/profile'><p className='cursor-pointer hover:text-[#fd3da1]'>My Profile</p></Link>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-[#fd3da1]'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-[#fd3da1]'>Logout</p>
                            </div>
                        </div>
                    )
                }
            </div>
                <Link to='/cart' className=' relative'>
                    <img src={assets.cart_icon} className=' w-5 min-w-5' alt="" />
                    <p className=' absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={()=> setVisible(true)} src={assets.menu_icon} className=' w-5 cursor-pointer sm:hidden ' alt="" />
        </div>
        {/* Sidebar menu fro the small screen */}
        <div className={` absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className=' flex flex-col text-gray-600'>
                    <div onClick={()=> setVisible(false)} className=' flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className=' h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=> setVisible(false)} className=' py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={()=> setVisible(false)} className=' py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={()=> setVisible(false)} className=' py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=> setVisible(false)} className=' py-2 pl-6 border' to='/contact'>CONTACT</NavLink>

                </div>
        </div>
    </div>
  )
}

export default Navbar
