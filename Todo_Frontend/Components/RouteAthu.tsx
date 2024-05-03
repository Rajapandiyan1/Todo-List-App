"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function RouteAthu() {
    
  let route=useRouter();

  useEffect(()=>{
    console.log("authendication use work")
    if(localStorage.getItem("Token")){
      fetch("http://localhost:3001/Api/verify",{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("Token")}`,
          'Content-Type': 'application/json',
          // Add other headers as needed
        }
      }).then((data)=>{
        return data.json();
      }).then((data)=>{
        console.log(data)
        if(data.verify){
          route.push("/Dashboard");
        }else{
          route.push("/Register");
        }
      })
    
    }else{
      route.push("/Register");
    }
    
      },[])
  return (
    <>
    </>
  )
}

export default RouteAthu