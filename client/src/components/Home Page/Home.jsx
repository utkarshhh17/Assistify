import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Nav from "../Nav/Nav";
export default function Home(){

    const listVariants = {
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15, // Staggering delay between each item
          },
        },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: -20 }, // Initial state of each item
        visible: { opacity: 1, y: 0 }, // Target state of each item
      };
      const listItems=["Expert Electronics Advice", "at Your Fingertips -", "Order with Confidence"]


      const buttonVariants = {
        hidden: { opacity: 0,  }, 
        visible: { 
            opacity: 1,
            transition:{
                delay:1,
                duration:1
            }  

        }, 
      };

    return(
        <div className="flex flex-col overflow-x-hidden">
            <Helmet>
                <title>Home | Assistify</title>
            </Helmet>

            <div><Nav /></div>

            <div className=" flex bg-electronics border-2 shadow-xl bg-cover h-[35vw]">
                
                <div className="text-white basis-3/5 text-7xl ml-[1vw] font-bold font-ubuntu mt-20 mb-3 flex flex-col justify-center">
                    <motion.ul
                        initial="hidden"
                        animate="visible"
                        variants={listVariants}
                    >
                        {listItems.map((item, index) => (
                        <motion.li key={index} variants={itemVariants} className="mb-3">
                            {item}
                        </motion.li>
                        ))}
                    </motion.ul>

                    <Link to="/products"><motion.button variants={buttonVariants} initial="hidden" animate="visible" className="mt-10 text-2xl ml-10 hover:scale-105 bg-[#3c4439] p-3 px-4 rounded-lg shadow-lg">Get Started</motion.button></Link>
                </div>
                
                <div><img src="sample.jpg" className="mt-20 ml-20 rounded-full w-[16vw] h-[16vw]"/></div>
                <div className="flex flex-col mr-10 mt-8">
                    <div><img src="sample2.jpg" className="mt-10 ml-10 rounded-full w-[7vw]"/></div>
                    <div><img src="sample3.jpg" className="mt-5 ml-10 rounded-full w-[7vw]"/></div>
                    <div><img src="sample4.jpg" className="mt-5 ml-10 rounded-full w-[7vw] h-[4.6vw]"/></div>
                </div>
            </div>


            <div className="flex flex-col mb-4 w-full">
                    
                  <div className="flex mt-5 ml-10 w-full ">
                      <img src="image1.png" className=" h-[30vw] w-auto" alt="Nike"></img>
                          
                          
                      <div className="flex flex-col ml-60 mt-[7rem] basis-1/2 text-6xl font-bold font-open-sans">
                        <p>Experience Joy in Every Purchase -</p> 
                        <p>Shop the Best Electronics with Us!</p>
                                  
                      </div>
                          
                  </div>

                  <div className="flex mt-5 ml-10 w-full ">

                      <div className="flex flex-col ml-2 mt-40 text-6xl font-bold font-open-sans basis-3/5">
                        <p>Find the Perfect Gadget </p> 
                        <p>with Expert Insights</p>
                          
                                  
                      </div>
                      <img src="image2.jpeg" className=" h-[30vw] w-auto rounded-full ml-10" alt="Nike"></img>
                          
                          
                      
                          
                  </div>


                  <div className="flex mt-5 ml-10 w-full ">
                      <img src="image3.png" className=" h-[30vw] w-auto" alt="Nike"></img>
                          
                          
                      <div className="flex flex-col ml-20 mt-40 text-6xl font-bold font-open-sans basis-3/5">
                        <p>Speedy and Secure Delivery</p> 
                        
                          
                                  
                      </div>
                          
                  </div>
                    
            </div>  

        </div>
    )

}