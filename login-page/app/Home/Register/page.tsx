"use client"
import Link from 'next/link'
import React, { useState } from 'react'

function page() {
    let [data,setdata]=useState({name:'',email:'',password:'',cpassword:''});
    let [error,seterr]=useState({name:false,email:false,password:false,cpassword:false,gmail:false,passSame:false});
    let [response,setResponse]=useState({response:'',statusCode:0})
    let [load,setLoad]=useState(false);

    async function createUser(newdata) {
      let copy={...newdata}
      delete copy.cpassword;
     let response=await fetch("http://localhost:3001/newUser",{
        method:"POST",
        headers:{

          "Content-Type":"application/json",
        },
        body:JSON.stringify(copy)
      }).then((data)=>{
        return data.json()
      }).then((data)=>{
        console.log(data)
        return data;
      }).catch((e)=>{
        console.log(e.message)
      }).finally(()=>{
        setLoad(false)
      })
      setResponse(response)
      console.log("res",response)
      return response;
    }
    function validation() {
      let err={name:false,email:false,password:false,cpassword:false,gmail:false,passSame:false};
      if(data.name==''){
        err.name=true;
      }
      if(data.email==''){
        err.email=true;
      }
      if(!data.email.endsWith('@gmail.com')){
        err.gmail=true;
      }
      if(data.password==''){
        err.password=true;
      }
      if(data.cpassword==''){
        err.cpassword=true;
      }
      if(data.password!=data.cpassword){
        err.passSame=true;
      }
      return err;
    }
    function TotalValid(err) {
      if(!err.name && !err.email&&!err.password&&!err.cpassword&&!err.gmail&&!err.passSame){
        return true;
      }
      return false
    }
  async  function submit(e) {
      let response;
      setLoad(true)
      e.preventDefault()
    let err=validation();
      seterr(err);
      console.log("password",data.cpassword==data.password)
      console.log(data.cpassword,data.password)
     let isValid= TotalValid(err);
     if(isValid){
 let response= await createUser(data)
 console.log(response)
     }
    //  alert("sd")
    setLoad(false);
    setTimeout(()=>{
setResponse({statusCode:0,response:''})
    },3000)
    }

  return (
    <div className="container">
    <form className="form">
        <h2>Register</h2>
        <input type="text" onChange={(e)=>{setdata((prev)=>{return {...prev,name:e.target.value}})}} placeholder="Username" required/>
        {error.name && <label className='text-danger mb-2'>Name is Required</label>}
        <input type="email" onChange={(e)=>{setdata((prev)=>{return {...prev,email:e.target.value}})}} placeholder="Email" required/>
        {error.email && <label className='text-danger mb-2'>Email is Required</label>}
        {error.gmail && !error.email &&<label className='text-danger mb-2'>Email is Required to @gmail.com</label>}


        <input type="password" onChange={(e)=>{setdata((prev)=>{return {...prev,password:e.target.value}})}} placeholder="Password" required/>
        {error.password && <label className='text-danger mb-2'>Password is Required</label>}

        <input type="password" onChange={(e)=>{setdata((prev)=>{return {...prev,cpassword:e.target.value}})}} placeholder="Confirm Password" required/>
        {error.cpassword && <label className='text-danger mb-2'>Confirm Password is Required</label>}
        {error.passSame && !error.cpassword && !error.password &&<label className='text-danger mb-2'>Confirm Password is not same in password</label>}

 {(response.statusCode==201) ? <div className='mt-3 mb-3 text-success'>{response.response}</div> : <></>}
 {(response.statusCode==400) ? <div className='mt-3 mb-3 text-danger'>{response.response}</div> : <></>}

 {load && <div className='mt-3 mb-3 d-flex justify-content-center align-items-center'><span className='spinner-border'></span></div> }
        <button type="submit" disabled={load} onClick={(ev)=>{submit(ev)}}>Register</button>
        <p>Already have an account? <Link href="/Home">Login here</Link>.</p>
    </form>
</div>
  )
}

export default page