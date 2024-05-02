"use client"
import { useRouter } from 'next/navigation'
import React from 'react'


let Logs=function Log() {
    let route=useRouter();
    function logouts(params) {
        if(localStorage.getItem("Token")){
            localStorage.removeItem("Token")
        }
        route.push("/")
    }
  return (
    <button className='btn btn-primary btn-sm' onClick={()=>{logouts()}}>Logout</button>

  )
}

export default Logs