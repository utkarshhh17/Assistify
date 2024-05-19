import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuthContext } from "../../hooks/useAuthContext";
import { motion } from "framer-motion";
import { ViewIcon } from "../../assets/ViewIcon";
import { Helmet } from "react-helmet";

export default function Login(){

    const [loginData,setLoginData]=useState({email:'',password:''});
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const {user, dispatch}=useAuthContext()
    const [showPassword, setShowPassword]= useState(false);
    const variants = {
        initial: {
          scale: 0.9,
          opacity: 0,
          transition: { duration: 0.5 }
        },
        animate: {
          scale: 1,
          opacity: 1,
          transition: { duration: 0.5 }
        },
        exit: {
          x: "-100vw",
          transition: { duration: 0.5 }
        }
      };
    
    useEffect(() => {
        if (user) {
            navigate("/")
        } 
    }, []);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        // console.log(formData);
        setLoginData((prevFormData)=>{
            return { ...prevFormData, [name]:value,}
        });
    }


    const handleClick=async (e)=>{
        if (!loginData.email || !loginData.password) {
            setError('Please fill in both email and password fields.');
            return;
        }
        console.log("The data is : "+loginData.email);
        setError('')         
        e.preventDefault();
           
        axios.post('http://localhost:8000/login', loginData)
        .then((response) => {               
            
            const json=response.data;
            if (response.status === 200) {
                setLoginData({email:'',password:''});
                        
                localStorage.setItem('assistifyUser', JSON.stringify(json))                       
                dispatch({type: 'LOGIN', payload: json})
                // console.log(response.data.token);
                navigate("/");
            }
            else{
                // Handle errors here
                console.error('Request failed');
                setError(response.data.error)
                
            }                
        })
            
        .catch((error) => {
            console.error(error.response.data.error);
           
            setError(error.response.data.error);
            
        });

    };

    const marginTop=error==null?'mt-10':'mt-5';

    return(
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-background1 bg-cover bg-no-repeat">

            <Helmet>
                <title>Login</title>
            </Helmet>

        <motion.div variants={variants} initial="initial" animate="animate" exit="exit" className="relative bg-white flex flex-col h-[350px] w-[600px] shadow-xl items-center rounded-lg">
            <div className="mt-5 font-roboto text-2xl">Enter your details</div>
            <>
            {error &&
            <div className="mt-3 text-red-500">{error}</div>}
            </>
            <input type='text' onChange={handleChange} value={loginData.email} name="email" placeholder="Enter Email" className={`w-[25rem] outline-none border-b-black border-b-[1px] ${marginTop}`}></input>
            <div className="flex w-auto ml-[1vw]">
                <input  type={showPassword ? 'text' : 'password'} onChange={handleChange} value={loginData.password} name="password" placeholder='Enter Password' className="w-[25rem] mt-10 outline-none border-b-black border-b-[1px]"></input>
                <button className="mt-10 cursor-pointer relative right-5" onClick={()=>{setShowPassword(!showPassword)}}><ViewIcon /></button>
            </div>
            
            <div className="mt-5 font-roboto text-sm text-slate-700">New User? <Link to='/register' className="underline hover:text-black">Signup</Link></div>
            <button onClick={handleClick} className="bg-black text-white py-2 px-5 rounded-sm hover:scale-110 mt-8 font-jost" >Login</button>
        </motion.div>
       

        </div>
    )
}