"use client"
import Link from 'next/link'
import React, { useState } from 'react'

function page() {
    let [data,setdata]=useState({name:'',email:'',password:'',cpassword:''});
    function submit() {
        fetch("http://localhost:3001/newUser",{
          method:"POST",
          headers:{

            "Content-Type":"application/json",
          },
          body:JSON.stringify(data)
        }).then((data)=>{
          console.log("success");
          console.log(data.json())
        }).catch((e)=>{
          console.log(e.message)
        })
    //  console.log(data)   
    }

  return (
    <div className="container">
    <form className="form">
        <h2>Register</h2>
        <input type="text" onChange={(e)=>{setdata((prev)=>{return {...prev,name:e.target.value}})}} placeholder="Username" required/>
        <input type="email" onChange={(e)=>{setdata((prev)=>{return {...prev,email:e.target.value}})}} placeholder="Email" required/>
        <input type="password" onChange={(e)=>{setdata((prev)=>{return {...prev,password:e.target.value}})}} placeholder="Password" required/>
        <input type="password" onChange={(e)=>{setdata((prev)=>{return {...prev,cpassword:e.target.value}})}} placeholder="Confirm Password" required/>
        <button type="submit" onClick={(ev)=>{submit()}}>Register</button>
        <p>Already have an account? <Link href="/Home">Login here</Link>.</p>
    </form>
</div>
  )
}

export default page