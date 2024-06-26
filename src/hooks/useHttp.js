/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react"

async function sendHttpRequest(url , config){
    const response = await fetch(url, config)
    const resData= await response.json()
    if(!response.ok){
        throw new Error(
            resData.messaga ||'Something went wrong, failed to send request')
    }
    console.log(response)
    return resData
}

export default function useHttp(url, config, initalData) {
  const [data,setData] = useState(initalData) 
  const[isLoading,setIsLoading] = useState(false)  
  const[error,setError] =  useState()
  function clearData(){
    setData(initalData)
  }
   const sendRequest= useCallback (
    async function sendRequest(data){
        setIsLoading(true)
        try{
        const resData = await sendHttpRequest(url, {...config, body:data})
        setData(resData)
    }catch(error){
        setError(error.message || 'Something went wrong!')
    }
    setIsLoading(false)
  },[url, config])
  useEffect(()=>{
    if(config && (config.method === 'GET' || !config.method) || !config){
       sendRequest() 
    }
  },[sendRequest, config])

  return{
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  }
}

 
