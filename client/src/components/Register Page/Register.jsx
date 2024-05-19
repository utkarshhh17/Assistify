import { Link, useNavigate} from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from '../../hooks/useAuthContext'
import { motion } from "framer-motion";
import { ViewIcon } from "../../assets/ViewIcon";
import { Helmet } from "react-helmet";


export default function Register(){

    const [signupData,setSignupData]=useState({username:'',email:'',password:'', confirmpassword:''});
    const [error, setError]=useState(null);
    const { dispatch } = useAuthContext();
    const navigate=useNavigate();
    const [showPassword, setShowPassword]= useState(false);
    const [showConfirmPassword, setShowConfirmPassword]= useState(false);


    const handleChange=(e)=>{
        const {name,value}=e.target;
        console.log(signupData);
        setSignupData((prevFormData)=>{
            return { ...prevFormData, [name]:value,}

    });
    };

    const variants = {
        initial: {
          x: "30vw",
          opacity: 0,
          transition: { duration: 0.5 }
        },
        animate: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.5 }
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.5 }
        }
      };

    const handleClick=async (e)=>{
        if (!signupData.email || !signupData.password || !signupData.confirmpassword || !signupData.username) {
            setError('Please fill in both email and password fields.');
            return;
        }
        if(signupData.confirmpassword!==signupData.password){
            setError('Passwords are not matching');
            return;

        }
        setError('')
        console.log(signupData);         
        e.preventDefault();

        const sendData={username:signupData.username, email:signupData.email, password:signupData.password}
           
        axios.post('http://localhost:8000/signup', sendData)
        .then((response) => {               
            
            const json=response.data;
            if (response.status === 200) {
                setSignupData({email:'',password:''});
                        
                localStorage.setItem('assistifyUser', JSON.stringify(json))
        
                        
                dispatch({type: 'LOGIN', payload: json})
                // console.log(response.data.token);
                navigate("/");
            }
            else{
                console.error('Request failed');
                setError(response.data.error)
                
            }                
        })

            
        .catch((error) => {
            console.error(error);
            setError(error.response.data.error);
        });

    };

  
    const marginTop=error==null?'mt-10':'mt-5';

   

    return(
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-background1 bg-cover bg-no-repeat">

            <Helmet>
                <title>Register</title>
            </Helmet>

        <motion.div variants={variants} initial="initial" animate="animate" exit="exit" className="relative bg-white flex flex-col h-auto w-[600px] shadow-xl items-center rounded-lg">
            <div className="mt-5 font-roboto text-2xl">Enter your details</div>
            {error &&
            <div className="text-red-400 mt-3">{error}</div>}
            <input type='text' onChange={handleChange} value={signupData.email} name="email" placeholder="Enter Email" className={`w-[25rem] outline-none border-b-black border-b-[1px] ${marginTop}`}></input>
            <input type='text' onChange={handleChange} value={signupData.username} name="username" placeholder="Enter UserName" className="w-[25rem] mt-10 outline-none border-b-black border-b-[1px]"></input>
           
            <div className="flex ml-[1vw]">
                <input type={showPassword ? 'text' : 'password'} onChange={handleChange} value={signupData.password} name="password" placeholder='Enter Password' className="w-[25rem] mt-10 outline-none border-b-black border-b-[1px]"></input>
                <button className="mt-10 cursor-pointer relative right-5" onClick={()=>{setShowPassword(!showPassword)}}><ViewIcon /></button>

            </div>

            <div className="flex ml-[1vw]">
                <input type={showConfirmPassword ? 'text' : 'password'} onChange={handleChange} value={signupData.confirmpassword} name="confirmpassword" placeholder='Confirm Password' className="w-[25rem] mt-10 outline-none border-b-black border-b-[1px]"></input>
                <button className="mt-10 cursor-pointer relative right-5" onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}><ViewIcon /></button>

            </div>
            
            
            <div className="mt-5 font-roboto text-sm text-slate-700">Already a User? <Link to='/login' className="underline hover:text-black">Login</Link></div>
            <button onClick={handleClick} className="bg-black text-white py-2 px-5 rounded-sm hover:scale-110 mt-8 font-jost mb-8" >Register</button>
        </motion.div>
       

        </div>
    )
}