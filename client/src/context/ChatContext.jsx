import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [toggleProductClick, setToggleProductClick]=useState(false)
    const [toggleType, setToggleType]=useState(false)
    const [typeOfProblem, setTypeOfProblem]=useState('')
    const [toggleInput, setToggleInput]=useState(false)

    const [product, setProduct]=useState('')

    
    const [orderList, setOrderList]=useState('')
    const [ orderClickToggle, setOrderClickToggle]=useState(false)
    const [orderSelected, setOrderSelected]=useState('')
    const [typing, setTyping]=useState(false)

    const addChat = (...newChats) => {
        setChats(prevChats => [...prevChats, ...newChats]);
    };

    const restartChatData=()=>{
        setChats([]);
    }

    // const handleToggle = () => {
    //     setToggleChat(!toggleChat);
    // };

    return (
        <ChatContext.Provider value={{ chats, addChat,restartChatData, toggleProductClick, setToggleProductClick, toggleType, setToggleType, product, setProduct, typeOfProblem, setTypeOfProblem, toggleInput, setToggleInput, typing, setTyping, orderList, setOrderList,orderSelected, setOrderSelected,  orderClickToggle, setOrderClickToggle }}>
            {children}
        </ChatContext.Provider>
    );
};
