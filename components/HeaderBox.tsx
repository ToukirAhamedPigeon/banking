import React from 'react'

const HeaderBox = ({type = "title", title, subtext, user}: HeaderBoxProps) => {
  return (
    <div className='header-box'>
      <h1 className="header-box-title dark:text-slate-200">
        {title}
        {type === 'greeting' && (
            <span className='text-bankGradient'>
                 &nbsp; {user}
            </span>
        )}
      </h1>
      <p className='header-box-subtext dark:text-slate-400'>{subtext}</p>
    </div>
  )
}

export default HeaderBox
