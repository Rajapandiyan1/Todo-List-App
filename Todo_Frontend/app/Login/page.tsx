'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import {useRouter} from 'next/navigation'
function page() {
  let route =useRouter()
  let [data,setdata]=useState({email:'',password:''});
  let [error,seterror]=useState({name:false,password:false,passLen:false});
  let [response,setRes]=useState({response:'',statusCode:0});
  let [load,setLoad]=useState(false);
  let [token,settoken]=useState('');
  async function createUser() {
    
   let response= await fetch("http://localhost:3001/Api/login",{
          method:"POST",
          headers:{

            "Content-Type":"application/json",
          },
          body:JSON.stringify(data)
        }).then((data)=>{
          return data.json();
        }).then((data)=>{
            settoken(data.token);
            return data;
        }).catch((e)=>{
        }).finally(()=>{
          setLoad(false)
        });
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
  try{
    e.preventDefault()
    setLoad(true);
    let validErr=validation();
    seterror(validErr);
    let response=await createUser();
    setRes(response);
    setLoad(false);
    settoken((prev)=>{
    
      if(prev!=''){
        localStorage.setItem("Token",prev);
    route.push("/Dashboard")
      }
      return prev;
    })

  }catch(e){
setRes(e)
  }finally{

  }

  }
  return (
    <div className="row justify-content-center">
<div className="col-8 col-md-4">

      <form action="" className="form w-100 mt-5">
         <h2>Login</h2>
         <label htmlFor="" className='mb-2 mt-3'>Email</label>
            <input className='form-control' type="email" onChange={(e)=>{ setdata((prev)=>{ return {...prev,email:e.target.value}})}} placeholder="Enter you Email" required/>
           {error.name &&<label htmlFor=""  className='text-danger mb-3'>Enter name is required</label>}
           <br /><label htmlFor="" className='mb-2'>Password</label>
            <input type="password" className='form-control' onChange={(e)=>{ setdata((data)=>{ return {...data,password:e.target.value}})}} placeholder="Enter Your Password" required/>
           {error.password &&<label htmlFor=""  className='text-danger mb-3'>Enter password is required</label>}
            {error.passLen &&  !error.password && <label htmlFor='' className='text-danger mb-3'>Password minimum length is 8</label>}
            {(response.statusCode==200) ? <div className='mt-3 mb-3 text-success'>{response.response}</div> : <></>}
 {(response.statusCode==400) ? <div className='mt-3 mb-3 text-danger'>{response.response}</div> : <></>}

 {load && <div className='mt-3 mb-3 d-flex justify-content-center align-items-center'><span className='spinner-border'></span></div> }
  <br />
            <button  type="submit" className='mb-4 btn btn-primary mt-2' disabled={load} onClick={(e)=>{submit(e)}}>Login</button>
            <p>Don't have an account? <Link href="/Home/Register">Register here</Link>.</p>
      </form>
</div>
    </div>
    
     )
}

export default page