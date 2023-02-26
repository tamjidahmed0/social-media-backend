import React ,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Cookies from 'js-cookie'
import { Link, NavLink } from 'react-router-dom'








const Signup = () => {
  const [loading, setloading] = useState([])
const [datas, setdata] = useState(null)
const [formData, setForm] = useState({
   username: '',
   password: ''
})

const handleSubmit = (event) =>{
    event.preventDefault(); 
    const name = event.target.name
    const value = event.target.value
// console.log(name, value)
    setForm((prev)=>{
     return {...prev , [name]:value}
 })

}

// console.log(formData.username)


const submit = (event) =>{
  event.preventDefault(); 
 
    const{username, password} = formData

    if(Object.keys(formData.username && formData.password).length === 0){

      toast.error(`All fields Required!`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
    }else{
     const login = process.env.REACT_APP_LOGIN_API
//       const instance = axios.create({
//         withCredentials: true,
      
//         baseURL:'http://localhost:8000/api/login',
//         headers:{
//           'Accept':'application/json',
        
//         }
//     });



// instance.post(login, {
//         username,
//         password
//       }).then((response)=>{
//         const setCookie = document.cookie
//         const cookievalue = setCookie.split('login=')[1]
// console.log(cookievalue)
  
       
//         const data = response.data.msg
//         toast.promise(` ${data}!`, {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: true,
//           progress: undefined,
//           pending: "Promise is pending",
//           success: "Promise  Loaded",
//           error: "error"
//         });
//       console.log(response)

// // toast.success('login success')
       

//       }).catch((error)=>{
//         toast.error(`${error.response.data.msg}`, {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: true,
//           progress: undefined,
//         });
//   console.log(error)
       

//       })

const promise = new Promise(async(resolve , reject)=>{

  try {
        const instance = axios.create({
        withCredentials: true,
      
        baseURL:'http://localhost:8000/api/login',
        headers:{
          'Accept':'application/json',
        
        }
    });
    const response = await instance.post(login,{
      username,
      password
    })


        toast.success(` ${response.data.msg}!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        
        })


    console.log(response.data.msg)
    resolve(response.data)
  } catch (error) {
        toast.error(`${error.response.data.msg}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });

console.log(error.response.data.msg)

    reject(error)
  }

})



 toast.promise(promise, {
    position: toast.POSITION.TOP_CENTER,
    pending: 'Loading data...',
   
    closeOnClick: true,
    pauseOnHover: false,
    progress: false,
    
  });
         
    }
    
}


  return (
    <>
      <ToastContainer />
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
      
            </p>
          </div>
          <h1>{datas}</h1>
          <form className="mt-8 space-y-6" action="#"  >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
      
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="username"
                  type="text"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email or Username"
                  value={formData.username}
                  onChange={handleSubmit}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleSubmit}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={submit}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            
            </div>
            <div className="text-sm text-center">
                <p href="#" className="font-medium text-black-600">
                  Don't have an account?
                </p> 
                <NavLink to={'register'} className='font-medium text-indigo-600 hover:text-indigo-500'>Register</NavLink>
              </div>
          </form>
        </div>
      </div>
    
    
    </>
  )
}

export default Signup