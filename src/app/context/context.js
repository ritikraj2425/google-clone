'use client'
import { createContext,useState } from "react";

export const DataContext = createContext();

export const DataProvider =({children})=>{
    const [mockSearchResults,setMockSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")

    return(
        <DataContext.Provider value={{mockSearchResults,setMockSearchResults,searchQuery,setSearchQuery}}>
            {children}
        </DataContext.Provider>
    )
}