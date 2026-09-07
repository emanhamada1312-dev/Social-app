import dayjs from 'dayjs'
import React from 'react'
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
export default function Comment({comment:{commentCreator:{name,photo},content,createdAt,image}}) {
  return (
    <>
    
        <div className=' my-2  border-2 border-gray-50 p-2 rounded-md'>
               <div className='flex items-center gap-2'> 
                <div>
                    <img className='w-10 h-10 rounded-full' src={photo} alt="" />
                </div>
                <div>
                    <h4>{name}</h4>
                    <h5>{dayjs(createdAt).fromNow()}</h5>
                    <h4>{content}</h4>
                </div></div>
               {image?<img src={image} className='w-[20%]'/>:""}
            </div>

      
    </>
  )
}
