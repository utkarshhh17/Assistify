import { useEffect, useState, useContext } from "react"
import Nav from "../Nav/Nav"
import axios from "axios";
import { Link } from "react-router-dom";
import Chat from "../Chat/Chat";
import { Helmet } from "react-helmet";
import { ChatContext } from "../../context/ChatContext";
export default function Products(){
    const [error, setError] = useState('');
    const [data,setData]=useState([]);


    useEffect(() => {
        const fetchData = async () => {
            
            
            axios.get('http://localhost:8000/products')
            .then((response) => {

                const json=response.data.products;
                if (response.status === 200) {
                    console.log(json);
                    setData(json);
                    // setSearchResponse(json.searchResults);


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
        };
    
        fetchData();
    
        // Clean-up function if needed
        // return () => {
        //   cleanup logic here
        // };
      }, []);



    return(
        <div className="flex flex-col mb-10">
            <div><Nav /></div>

            <Helmet>
                <title>Products</title>
            </Helmet>
            
            
            <div className="flex flex-wrap justify-left small:justify-center">
                {data.map((product, index) => (
                    <Link to={`/products/${product._id}`} className="flex flex-col items-center justify-between small:w-[90vw] small:h-80 small:mb-5 small:ml-0 w-[23vw] h-[25vw] px-1 border border-gray-300 rounded-lg ml-6 mt-6 hover:scale-105 cursor-pointer" key={index}>
                        
                       <img className="mt-2" style={{ height: '240px' }} src={product.image}></img>
                        <div className="flex flex-col mb-2 w-full">
                        <p className=" text-center font-lato text-md truncate w-full border-b-gray-200 border-b-2">{product.Name}</p>
                        <p className="font-bold text-center font-lato  text-base">₹{product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div><Chat /></div>
        </div>
    )

}