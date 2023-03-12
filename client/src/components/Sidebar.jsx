
import React, {useState} from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
// import Tamjid from '../../assets/images/tamjid.jpg'
import { AiOutlineArrowLeft, AiFillDashboard, AiOutlineTeam, AiFillContacts} from "react-icons/ai"
import { DiAndroid} from "react-icons/di"
import {BiLogOut} from 'react-icons/bi'
// import { motion, AnimatePresence } from 'framer-motion';
// import LineChart from '../Chart/LineChart'


const Menus = [
  {title:'Dashboard' , icons: <AiFillDashboard/>, link: '/dashboard' },
  {title:'Manage Team', icons: <AiOutlineTeam/>, link: 'team'  },
  {title:'Contact Information', icons: <AiFillContacts/>, link: 'contact'},

]


  
const Hero = () => {
  const activeClassName = 'bg-light-white rounded-md'

  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

const handleLogout = () => {
  
    localStorage.removeItem('state', false);
    
    navigate('/')
  }
  
  return (
    <>

    <div className='flex mbl:relative' >
    <div className={`bg-dark min-h-screen p-5 pt-8 relative  ${open ? 'w-72' : 'w20'} duration-700 ease-in-out mbl:absolute mbl:hidden `} >
      <AiOutlineArrowLeft className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open &&' rotate-180' }`} onClick={()=>setOpen(!open)} />
      <div className=' inline-flex' >
      <DiAndroid className={`bg-amber-300 text-4xl rounded float-right mr-2 duration-500 ${ open && 'rotate-[360deg]'} mbl:hidden `} />
      <h1 className={ `text-white origin-left font-medium text-2xl ml-3 ${!open && 'hidden'} `} >TA software LTD</h1>
      </div>
      {/* <div className={`flex flex-col justify-center items-center mt-8 ${!open && 'hidden'} `} >
        <img className=' w-20 rounded-full ' src={''} />
        <h4 className=' text-white font-medium text-1xl mt-3'>Tamjid Ahmed</h4>
      </div> */}
      <ul className='pt-20' >
          {Menus.map((menu, index)=>(
            <>
              <li key={index} className ='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'  >
              
                <span className=' text-2xl block float-left '>{menu.icons? menu.icons : <AiFillDashboard/>}
                
                </span>
                <NavLink to={menu.link ? menu.link : '/'} className={ `text-base font-medium flex-1 ${!open && 'hidden'} `}  >
                  {menu.title }
                  </NavLink>
                {/* <span className={ `text-base font-medium flex-1 ${!open && 'hidden'}`} >{menu.title}</span> */}
              </li>
              
            </>
          ))}
      </ul>
      <div className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2  bottom-0' onClick={handleLogout} >
        <BiLogOut className='text-2xl' />
        <span className={` text-lg font-semibold  ${!open && 'hidden'}`}  >log out</span>
      </div>
      
    </div>
   
    </div>

    </>
  )
}

export default Hero