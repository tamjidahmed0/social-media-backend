import axios from "axios"


axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN




//axios login user
export const login = async (credentials)=>{
try {
    
    const response = await axios.post(`api/login`, credentials)

    return response
   
} catch (error) {
    throw error
}
}

//axios register user 
export const register = async(credentials)=>{
  try {
    const response = await axios.post(`api/register`, credentials)
    return response
  } catch (error) {
    return error
  }
}