import React from 'react'


function NewsletterBox() {

    const onSubmitHandler = (event)=>{
        event.preventDefault();
    }

  return (

    <div className=' text-center'>
      <p className=' text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className=' text-gray-400 mt-3'>
      This offer applies to both men's, women's and kid's collections, and it is available across multiple categories, including new arrivals, seasonal trends, and popular brands. Terms and conditions may apply, such as the exclusion of certain brands or items and minimum purchase requirements.
      </p>
      <form onSubmit={onSubmitHandler} className=' w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4 hover:bg-[#fd3da1]'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox;
