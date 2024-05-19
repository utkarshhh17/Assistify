import { useState, useContext, useEffect} from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

import ChatIcon from "./ChatIcon"
import { ChatContext } from "../../context/ChatContext";
import RestartIcon from "./RestartIcon";
import Typing from "./Typing";

export default function Chat(){
    const { data } = useParams(); // Use useParams at the top level

    // Use useEffect to handle changes to the URL parameter
    useEffect(() => {
        // Handle the change in URL parameter here
        console.log("URL parameter changed: ", data);
        // Additional logic to handle the new parameter value can be added here
    }, [data]);

    

    const { chats, addChat,restartChatData, toggleProductClick, setToggleProductClick, toggleType, setToggleType, product, setProduct, typeOfProblem, setTypeOfProblem, toggleInput, setToggleInput , typing, setTyping} = useContext(ChatContext);

    const [toggleChat, setToggleChat]=useState(false)

    // const [chats,setChats]=useState([])

    // const [toggleType, setToggleType]=useState(false)


    const [inputText, setInputText]=useState('')

    // const [toggleProductClick, setToggleProductClick]=useState(false)

    const handleToggle=()=>{
        setToggleChat(!toggleChat)
    }


    // const addChat = (...newChats) => {
    //     setChats(prevChats => [...prevChats, ...newChats]);
    // };

    const handleHelpClick = () => {
        addChat(
            { name: "user", message: "I need help with an issue" },
            { name: "bot", message: "Please describe your issue in detail." }
        );
        setToggleType(true)
    };

    const handleProblemType=(message)=>{
        setTypeOfProblem(message)
        addChat({name:"user", message:message})
        setToggleType(false)
        
        if(message==='General Query'){
            setToggleInput(true)
            
        }

        if(message==='Product Related Query'){
            addChat({name:"bot", message:'Click on the product you want to know about.'})
            setToggleProductClick(true)
        }
    }

    const handleProductProblem=()=>{
        setToggleProductClick(false)

        addChat({name:"bot", message:'Please let us know what you want to know about:'})
        axios.get('http://localhost:8000/products/'+data)
        .then((response) => {               
            const json=response.data;
            if (response.status === 200) {
                
                setProduct(json)
                console.log("the data is"+product.Name);
                addChat({name:"bot", message:json.Name})
                setToggleInput(true)
    
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

    const handleChange=(e)=>{
        setInputText(e.target.value)
        console.log(e.target.value)
    }
    
    
    const handleSend=(e)=>{
        e.preventDefault();
        addChat({name:"user", message:inputText})
        setInputText('')
        let additionalInfo=''
        if(typeOfProblem==='Product Related Query'){
            additionalInfo='Query related to: '+product
        }
        if(typeOfProblem==='Order Related Query'){
          
        }

        const sendingData={"message":inputText + '\n' + additionalInfo}
        setTyping(true)
        axios.post('http://localhost:8000/chat', sendingData)
        .then((response) => {               
            const json=response.data;
            if (response.status === 200) {
                
                setTyping(false)
                console.log("the response is"+json);
                addChat({name:"bot", message:json})
                setToggleInput(true)
    
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


    const restartChat=()=>{
        restartChatData()
        setToggleProductClick(false)
        setTypeOfProblem('')
        setToggleInput(false)
    }


   
    
    return(
        <div className="fixed right-3 bottom-3 flex flex-col items-end">
            {toggleChat &&
                <div className="flex flex-col mb-5 h-[30rem] w-[25rem] bg-white border-2 px-3 py-3 ">
                <div className="flex h-8 border-b-2 items-center">
                    <div className="basis-3/4 flex justify-center font-bold font-open-sans ml-10">Customer Support</div>
                    <div onClick={restartChat} className="absolute top-2 right-3 cursor-pointer"><RestartIcon /></div>
                </div>
                <div className="flex flex-col h-full justify-end overflow-y-auto">
                    {chats.length === 0 &&
                        <div onClick={handleHelpClick}  className="cursor-pointer text-black font-lato border-2 border-green-800 p-1 bg-green-100 rounded-lg w-60">
                            I need help with an issue
                        </div>
                    }

                    {chats.length>0 &&
                        <div className="overflow-y-auto">
                          {chats.map((chat, index)=>(
                            <li key={index} className="text-black flex justify-center w-full mb-2">
                                {chat.name==='bot' &&
                                <div className="flex justify-start w-full ml-1 mr-1">
                                    <div className="flex flex-col bg-green-300 min-w-[3vw] h-auto p-1 pr-2 rounded-xl">
                                        <div className="text-sm ml-2 text-green-800 font-bold">
                                            {chat.name}
                                        </div>
                                        <div className="m-1 ml-2">{chat.message}</div>
                                    </div> 

                                </div>
                                }
                                {chat.name==='user' &&
                                <div className="flex justify-end w-full mr-2">
                                    <div className="flex flex-col bg-blue-300 min-w-[3vw] h-auto p-1 pr-2 rounded-xl">
                                        <div className="text-sm ml-2 text-blue-800 font-bold">
                                            {chat.name}
                                        </div>
                                        <div className="m-1 ml-2">{chat.message}</div>
                                    </div> 

                                </div>
                                }
                            </li>
                          )
                          )}  
                        </div>

                    }

                    {toggleType && 
                    <div className="flex flex-col">
                        <div onClick={()=>handleProblemType("General Query")}  className="cursor-pointer text-black font-lato border-2 border-green-800 p-1 bg-green-100 mb-2 rounded-lg w-40">
                            General Query
                        </div>
                        <div onClick={()=>handleProblemType("Product Related Query")}  className="cursor-pointer text-black font-lato border-2 border-green-800 p-1 bg-green-100 mb-2 rounded-lg w-60">
                            Product Related Query
                        </div>
                        <div onClick={()=>handleProblemType("Order Related Query")}  className="cursor-pointer text-black font-lato border-2 border-green-800 p-1 bg-green-100 rounded-lg w-60">
                            Order Related Query
                        </div>
                    </div>
                    }

                    {toggleProductClick && 
                    <div className="flex flex-col">
                        <div onClick={handleProductProblem}  className="cursor-pointer text-black font-lato border-2 border-green-800 p-1 bg-green-100 mb-2 rounded-lg w-40">
                            Done
                        </div>
                        
                    </div>
                    }

                    {typing && 
                    <div className="">
                        <Typing />
                    </div>
                    }

                    {toggleInput && 
                    <div className="w-full flex mt-3">
                        <input type="text" className="h-10 outline-none font-lato border-b-2 w-80" onChange={handleChange} value={inputText}></input>
                        <button onClick={handleSend} className="font-lato bg-green-800 text-white text-sm p-2 rounded-lg ml-3">Send</button>
                    </div>
                    }

                </div>
                </div>

            }
            <div className="cursor-pointer hover:scale-105 rounded-full flex justify-center items-center w-[4.5rem] h-[4.5rem] bg-[#3c4439]" onClick={handleToggle}>
                <div><ChatIcon /></div>
            </div>
        </div>
    )
}