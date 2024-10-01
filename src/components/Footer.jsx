import React from 'react'
import { assets } from '../assets/assets'



function Footer() {
  return (
    <div>
      <div className=' flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
         <div>
            <img src={assets.logo2} className=' mb-5 w-14 h-14 rounded-full' alt="" />
            <p className=' w-full md:w-2/3 text-gray-600'>
            Terms and conditions may apply, such as the exclusion of certain brands or items and minimum purchase requirements.
            </p>
         </div>
         <div>
            <p className=' text-xl font-medium mb-5 text-[#fd3da1]'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
         </div>
         <div>
            <p className=' text-xl font-medium mb-5 text-[#fd3da1]'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+234-7036594624</li>
                <li>abginfotech@outlook.com</li>

            </ul>
         </div>
      </div>
      <div>
        <hr />
        <p className=' py-5 text-sm text-center'>Copyright 2024@ <span className='text-[#fd3da1]'>ABG.com</span> - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
