import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

import Nav from "../Nav/Nav";
import Chat from "../Chat/Chat";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Product(){
    const { data } = useParams();

    const [responseData, setResponseData]=useState(null);
    
    const {user, dispatch}=useAuthContext()

    const [successPopup, setSuccessPopup]=useState(false);

    
    const navigate=useNavigate();

    
    useEffect(() => {
        const fetchData = async () => {
            const stringurl='http://localhost:8000/products/'+data;
            axios.get(stringurl)
            .then((response) => {               
                const json=response.data;
                if (response.status === 200) {
                    console.log(json);
                    setResponseData(json);
                    
    
                }
                else{
                    // Handle errors here
                    console.error('Request failed');
                    // setError(response.data.error)
                    
                }                
            })
                
            .catch((error) => {
                console.error(error.response.data.error);
            });
    
          
        }
        fetchData();
        
    
    }, [data]);

    const handleClick=()=>{

        if(!user){
            navigate('/login')
        }

        const sendingData={'user':user.email,'product':responseData.Name}

        axios.post('http://localhost:8000/order', sendingData)
            .then((response) => {               
                const json=response.data;
                if (response.status === 200) {
                    
                    console.log(json);
                    setSuccessPopup(true);
                    
    
                }
                else{
                    // Handle errors here
                    console.error('Request failed');
                    // setError(response.data.error)
                    
                }                
            })
                
            .catch((error) => {
                console.error(error.response.data.error);
            });
        
    }
   
    useEffect(() => {
        if (successPopup) {
            // Execute function after setSuccessPopup is true
            setTimeout(() => {
                navigate('/products');
            }, 3000); // 3 seconds delay
        }
    }, [successPopup, navigate]);

    const animationVariants = {
        initial: { x: '-4vw', opacity: 0 },
        animate: { x: 0, opacity:1, transition: { duration: 0.5 } },
        hidden: { opacity: 0, transition: { duration: 0.5, delay: 3 } }
    };


    return(
        <div className="flex flex-col">
            
            <div><Nav /></div>
            {successPopup &&
            <motion.div variants={animationVariants} initial="initial" animate="animate" exit="hidden" className='flex justify-start absolute top-[3vw] h-[5vw] w-[15vw] bg-white rounded-sm shadow-xl z-10'>
                <div className='bg-green-400 h-full w-5'></div>
                <div className='flex relative top-4 ml-2'>The order was Sucess!</div>
            </motion.div>
        
        }
            {responseData &&
                <div>
                <Helmet>
                    <title>{responseData.Name}</title>
                </Helmet>
                <div className="flex justify-start small:hidden">
                    <img src={responseData.image} alt="Product Image" className="h-[35vw] mt-[4vw] ml-10"></img>
                    <div className="flex flex-col font-lato justify-start mt-20">
                        <div className="text-3xl font-bold mt-[1vw]">{responseData.Name}</div>
                        <div className="text-2xl mt-[0.7vw]">₹{responseData.price}</div>
                        <div className="mt-20 ml-2">
                            <button onClick={handleClick} className="h-[3.5rem] w-40 font-lato font-bold text-white text-xl rounded-lg bg-green-800">
                                Order
                            </button>
                        </div>
                    </div>

                </div>


       
                
                </div>
            }

            <div><Chat /></div>
        </div>
    )


}