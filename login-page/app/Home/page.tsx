'use client'
import Link from 'next/link'
import React, { useState } from 'react'

function page() {
  let [data,setdata]=useState({email:'',password:''});
  let [error,seterror]=useState({name:false,password:false,passLen:false});
  let [response,setRes]=useState({response:'',statusCode:0});
  let [load,setLoad]=useState(false);
  async function createUser() {
    
   let response= await fetch("http://localhost:3001/login",{
          method:"POST",
          headers:{

            "Content-Type":"application/json",
          },
          body:JSON.stringify(data)
        }).then((data)=>{
          return data.json();
        }).catch((e)=>{

        }).finally(()=>{
          setLoad(false)
        })
        return response;
  }
function validation() {

let  err={name:false,password:false,passLen:false}
  if(data.email==''){
  err.name=true;
  }

   if(data.password==''){
err.password=true;
  }
  let len=data.password.length
  
  if(len < 7){
    err.passLen=true;
  }
  return err;
}
 async function submit(e) {
  e.preventDefault()
  setLoad(true);
  let validErr=validation();
seterror(validErr);

let response=await createUser();
setRes(response)
setLoad(false)
setTimeout(() => {
  setRes({response:'',statusCode:0})
}, 3000);
  }
  return (
    <div className="container">
      <form action="" className="form">
         <h2>Login</h2>
         <label htmlFor="" className='mb-2'>Email</label>
            <input type="email" onChange={(e)=>{ setdata((prev)=>{ return {...prev,email:e.target.value}})}} placeholder="Username" required/>
           {error.name &&<label htmlFor=""  className='text-danger mb-3'>Enter name is required</label>}
           <br /><label htmlFor="" className='mb-2'>Password</label>
            <input type="password" onChange={(e)=>{ setdata((data)=>{ return {...data,password:e.target.value}})}} placeholder="Password" required/>
           {error.password &&<label htmlFor=""  className='text-danger mb-3'>Enter password is required</label>}
            {error.passLen &&  !error.password && <label htmlFor='' className='text-danger mb-3'>Password minimum length is 8</label>}
            {(response.statusCode==200) ? <div className='mt-3 mb-3 text-success'>{response.response}</div> : <></>}
 {(response.statusCode==400) ? <div className='mt-3 mb-3 text-danger'>{response.response}</div> : <></>}

 {load && <div className='mt-3 mb-3 d-flex justify-content-center align-items-center'><span className='spinner-border'></span></div> }
  
            <button type="submit" className='mb-4' disabled={load} onClick={(e)=>{submit(e)}}>Login</button>
            <p>Don't have an account? <Link href="/Home/Register">Register here</Link>.</p>
      </form>
    </div>
     )
}

export default page