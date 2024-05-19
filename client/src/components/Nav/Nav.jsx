import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
export default function Nav(){
    
    
    // const location = useLocation();
    // const [bgClass, setBgClass] = useState('');
    // const [showLinks, setShowLinks] = useState(false);
    const {user, dispatch}=useAuthContext()
    const [showMenu, setShowMenu]=useState(false)
    const navigate=useNavigate();

    const handleClick=()=>{
      setShowMenu(!showMenu)
    }
    const handleLogOut=()=>{
        localStorage.removeItem('assistifyUser');
        dispatch({type:'LOGOUT'});
        navigate("/login")

    }

    
    
    // const toggleLinks = () => {
    //   setShowLinks(!showLinks);
    // };

  
    return(
        <div className={`flex justify-between text-white bg-[#3c4439] py-5 `}>

            <div className="flex  small:text-3xl small:basis-1/4 justify-between ml-7 font-oswald text-4xl cursor-pointer"><Link to="/">Assistify</Link></div>
            
            
            <div className="flex justify-between mr-[5vw] font-open-sans text-[1.3vw] font-bold small:hidden">
                <div className='mr-40 mt-1 text-[1.2vw]'><Link to="/products">Products</Link></div>
               
                <div>
                {user &&
                <div className=''>
                <button onClick={handleClick} className="transition h-10 flex items-center justify-center cursor-pointer hover:font-bold text-lg
               hover:bg-white px-2 duration-500 hover:shadow-md hover:text-black rounded-2xl" >
                 {user.username}</button>
                 
                 
                 {showMenu && 
                 <div className='flex absolute flex-col right-[4.9vw] bg-white text-black font-lato text-sm rounded-md shadow-xl'>
                    <div className='border-b-gray-200 border-b-2 hover:bg-gray-300 cursor-pointer py-2 px-4'><Link to="/reset">Reset Pasword</Link></div>
                    <div className='border-b-gray-200 border-b-2 hover:bg-gray-300 cursor-pointer py-2 px-4'><Link to="/orderhistory">Order History</Link></div>
                    <div className='hover:bg-gray-300 cursor-pointer  py-2 px-4' onClick={handleLogOut}>Logout</div>
                 </div>
                 }
                 </div>
                }

                {!user &&
                <div className=''>
                    <Link to='/login'><button className="transition h-10 flex items-center justify-center cursor-pointer hover:font-bold text-lg
                hover:bg-white px-2 duration-500 hover:shadow-md hover:text-black rounded-2xl" >
                    Login</button></Link>
                 
                
                 </div>
                }


                </div>



            </div>
            
            
            

        </div>
    )


}