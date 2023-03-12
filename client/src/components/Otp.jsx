import React, {useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { setOtp } from '../features/otpRedirect'





const Otp = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  console.log(token)
    const [digits, setDigits] = useState({
      digit1:'',
      digit2:'',
      digit3:'',
      digit4:'',
      digit5:'',
      digit6:''
    })
const objectValue = Object.values(digits)
const joinValues = objectValue.join('')
console.log(joinValues)

    const handleSubmit = (event) =>{
        event.preventDefault(); 
        const name = event.target.name
        const value = event.target.value
    // console.log(name,value)
    setDigits((prev)=>{
         return {...prev , [name]:value}
     })
     
    
    }



    const submit = (event) => {
        event.preventDefault();
        
        // Submit the OTP code using Axios
        axios.post('http://localhost:8000/api/otp', { code:joinValues.toString() })
          .then(response => {
            console.log(response.data);
            // Handle the success response here
          })
          .catch(error => {
            console.error(error);
            // Handle the error response here
          });
      };




  return (
    <div className="max-w-md mx-auto">
  <h2 className="text-2xl font-bold mb-4">Verify your phone number</h2>

  <p className="text-gray-600 mb-8">Enter the 6-digit code we sent to your phone number</p>

  <form >
    <div className="flex justify-center mb-4">
      <input  className="w-12 text-center border rounded-md mr-2" type="text" name="digit1" onChange={handleSubmit} value={digits.digit1} maxLength="1" />
      <input className="w-12 text-center border rounded-md mr-2" type="text" name="digit2" onChange={handleSubmit}  value={digits.digit2} maxLength="1" />
      <input className="w-12 text-center border rounded-md mr-2" type="text" name="digit3" onChange={handleSubmit} value={digits.digit3} maxLength="1" />
      <input className="w-12 text-center border rounded-md mr-2" type="text" name="digit4" onChange={handleSubmit}  value={digits.digit4} maxLength="1" />
      <input className="w-12 text-center border rounded-md" type="text" name="digit5" onChange={handleSubmit}  value={digits.digit5} maxLength="1" />
      <input className="w-12 text-center border rounded-md ml-2" type="text" name="digit6" onChange={handleSubmit}  value={digits.digit6} maxLength="1" />
    </div>

    <div className="text-center">
      <button onClick={submit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" type="submit">Verify</button>
    </div>
  </form>
</div>


  )
}

export default Otp