import {  createContext, useState } from "react";



export let CounterContext=createContext()

export function CounterContextProvider({children}){
    const [counter, setCounter] = useState(0)
    return <CounterContext.Provider value={{counter,setCounter}}>
        {/* app */}
        {children}
    </CounterContext.Provider>
}