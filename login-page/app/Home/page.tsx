'use client'
import Link from 'next/link'
import React, { useState } from 'react'

function page() {
  let [data,setdata]=useState({name:'',password:''});
  let [error,seterror]=useState({name:false,password:false,passLen:false})
  async function createUser() {
    
   let response= await fetch("http://localhost:3001/login",{
          method:"POST",
          headers:{

            "Content-Type":"application/json",
          },
          body:JSON.stringify(data)
        });
        return response;
  }
function validation() {
  console.log(data)
let  err={name:false,password:false,passLen:false}
  if(data.name==''){
  err.name=true;
  }

   if(data.password==''){
err.password=true;
  }
  let len=data.password.length
  console.log(typeof len)
  if(len < 7){
    err.passLen=true;
  }
  return err;
}
 async function submit(e) {
  e.preventDefault()
  let validErr=validation();
seterror(validErr);
  console.log(validErr)
let response=await createUser();
  }
  return (
    <div className="container">
      <form action="" className="form">
         <h2>Login</h2>
         <label htmlFor="" className='mb-2'>Email</label>
            <input type="email" onChange={(e)=>{ setdata((prev)=>{ return {...prev,name:e.target.value}})}} placeholder="Username" required/>
           {error.name &&<label htmlFor=""  className='text-danger mb-3'>Enter name is required</label>}
           <br /><label htmlFor="" className='mb-2'>Password</label>
            <input type="password" onChange={(e)=>{ setdata((data)=>{ return {...data,password:e.target.value}})}} placeholder="Password" required/>
           {error.password &&<label htmlFor=""  className='text-danger mb-3'>Enter password is required</label>}
            {error.passLen && <label htmlFor='' className='text-danger mb-3'>Password minimum length is 8</label>}
            <button type="submit" className='mb-4' onClick={(e)=>{submit(e)}}>Login</button>
            <p>Don't have an account? <Link href="/Home/Register">Register here</Link>.</p>
      </form>
    </div>
     )
}

export default page