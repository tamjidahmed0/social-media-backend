import React from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { setMsg } from '../features/welcomeSlice';

import LineChart from './Chart/LineChart'
import PieChart from './Chart/PieChart'
import GeoMap from './Chart/Choropleth'
import Sunburst from './Chart/Sunburst'

import {AiOutlineMail, AiOutlineUserAdd, AiFillSetting,  AiOutlineUsergroupAdd} from 'react-icons/ai'
import {MdOutlineNightsStay} from 'react-icons/md'
import {IoMdNotificationsOutline, IoSettingsOutline } from 'react-icons/io'
import Layout from './Layout';






const Dashboard = () => {
 
  const dispatch = useDispatch()
  const msg = useSelector((state) => state.welcome.msg)

  // const handleLogout = () => {
   

  // console.log('clicked')
  //   localStorage.removeItem('state', false);
  //   navigate('/')
    
  // };



  return (
    <>
    
    <div className=' flex flex-col p-7 '>
        <div className='grid grid-cols-2'>
            <div>
            <h1 className='text-2xl font-bold '>Dashboard</h1>
             <p className=' text-base font-semibold text-sea'>{msg}</p>
            </div>
        <div className='flex justify-center items-center text-2xl'>
            <MdOutlineNightsStay  />
            <IoMdNotificationsOutline className='mr-5 ml-5' />
            <AiFillSetting/>
        </div>
  
        </div>

        
        <div className=' grid grid-cols-4 gap-4 mt-8 mbl:grid-cols-1'>
            <div className=' bg-dark rounded'>
                <div className=' flex flex-col p-5 ' >
                    <AiOutlineMail className=' text-3xl mb-2 text-sea ' />
                    <h5 className=' font-semibold'>12,541</h5>
                    <p className=' text-sea'>Emails sent</p>
                </div>
            </div>
            <div className=' bg-dark rounded'>
                <div className=' flex flex-col p-5 ' >
                    <AiOutlineMail className=' text-3xl mb-2 text-sea ' />
                    <h5 className=' font-semibold'>12,541</h5>
                    <p className=' text-sea'>Salses Obtained</p>
                </div>
            </div>
            <div className=' bg-dark rounded'>
                <div className=' flex flex-col p-5 ' >
                    <AiOutlineUserAdd className=' text-3xl mb-2 text-sea ' />
                    <h5 className=' font-semibold'>12,282</h5>
                    <p className=' text-sea'>New clients</p>
                </div>
            </div>
            <div className=' bg-dark rounded'>
                <div className=' flex flex-col p-5 ' >
                    <AiOutlineUsergroupAdd className=' text-3xl mb-2 text-sea ' />
                    <h5 className=' font-semibold'>9</h5>
                    <p className=' text-sea'>Total users</p>
                </div>
            </div>
        
        </div>
        <div className=' grid grid-cols-3 gap-4 mt-4 h-[500px] mbl:grid-cols-1'>
                <div className=' bg-dark rounded col-span-2'>
                    <div className=' p-5' >
                    <p className=' font-medium' >Revenue Generated</p>
                    <h1 className=' font-bold text-2xl text-sea' >৳69,736.82</h1>
                    </div>                  
                  <LineChart className ='text-white' />
                </div>
                <div className="dark rounded  max-h-screen  overflow-y-auto   ">
                    <div className=' bg-dark flex justify-around p-7 mb-1'>
                    <p>Tamjid</p>
                    <p>2023-09-01</p>
                    <p>$765</p>      
                    </div>
                    <div className=' bg-dark flex justify-around p-7 mb-1'>
                    <p>Tamjid</p>
                    <p>2023-09-01</p>
                    <p>$765</p>      
                    </div>
                    <div className=' bg-dark flex justify-around p-7 mb-1'>
                    <p>Tamjid</p>
                    <p>2023-09-01</p>
                    <p>$765</p>      
                    </div>
                    <div className=' bg-dark flex justify-around p-7 mb-1'>
                    <p>Tamjid</p>
                    <p>2023-09-01</p>
                    <p>$765</p>      
                    </div>
                    <div className=' bg-dark flex justify-around p-7 mb-1'>
                    <p>Tamjid</p>
                    <p>2023-09-01</p>
                    <p>$765</p>      
                    </div>
                    <div className=' bg-dark flex justify-around p-7 mb-1'>
                    <p>Tamjid</p>
                    <p>2023-09-01</p>
                    <p>$765</p>      
                    </div>
                    <div className=' bg-dark flex justify-around p-7 mb-1'>
                    <p>Tamjid</p>
                    <p>2023-09-01</p>
                    <p>$765</p>      
                    </div>
                    
                 
                </div>   
            </div>
        <div className=' grid grid-cols-3 gap-4 mt-4 mbl:grid-cols-1'>
            <div className=' bg-dark' >
         
                <Sunburst/>
                
            </div>
            <div className=' bg-dark' >
                <div className=' p-5'>
                    <h1>Salse Quantity</h1>
                </div>
                <PieChart/>
            </div>
            <div className=' bg-dark' >
                <GeoMap/>
            </div>
        </div> 
    </div>
    </>
  )
}

export default Dashboard