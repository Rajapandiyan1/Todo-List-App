"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() {
  let router=useRouter();
    let [data,setdata]=useState({username:'',email:'',password:'',cpassword:''});
    let [error,seterr]=useState({name:false,email:false,password:false,cpassword:false,gmail:false,passSame:false});
    let [response,setResponse]=useState({response:'',statusCode:0})
    let [token,settoken]=useState('');
    let [load,setLoad]=useState(false);
    async function createUser(newdata) {
      let copy={...newdata}
      delete copy.cpassword;
     let response=await fetch("http://localhost:3001/Api/register",{
        method:"POST",
        headers:{

          "Content-Type":"application/json",
        },
        body:JSON.stringify(copy)
      }).then((data)=>{
        return data.json()
      }).then((data)=>{
        settoken(data.token);
    setdata({username:'',email:'',password:'',cpassword:''});

        return data;
      }).catch((e)=>{
        setResponse(e)
      }).finally(()=>{
        setLoad(false)
      })
      setResponse(response)

      return response;
    }
    function validation() {
      let err={name:false,email:false,password:false,cpassword:false,gmail:false,passSame:false};
      if(data.username==''){
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
      return false;
    }
  async  function submit(e) {
  
      setLoad(true)
      e.preventDefault()
    let err=validation();
      seterr(err);
     let isValid= TotalValid(err);
     if(isValid){
 let response= await createUser(data)
     }
    //  alert("sd")
    setLoad(false);
    setTimeout(()=>{
setResponse({statusCode:0,response:''})
    },3000)
    function rout() {
        router.push('/Dashboard')
        
    }
    settoken((token)=>{
        console.log("token",token)
      if(token!=''){
        localStorage.setItem('Token',token);
        rout()
      }

      return token;
    })
    }

  return (
    <div className="row justify-content-center">
        <div className="col-md-4">

    <form className="form">
        <h2>Register</h2>
        <input type="text" value={data.username} className='form-control mt-3' onChange={(e)=>{setdata((prev)=>{return {...prev,username:e.target.value}})}} placeholder="Username" required/>
        {error.name && <label className='text-danger mb-1'>Name is Required</label>}
        <input type="email" className='form-control mt-3' value={data.email} onChange={(e)=>{setdata((prev)=>{return {...prev,email:e.target.value}})}} placeholder="Email" required/>
        {error.email && <label className='text-danger mb-1'>Email is Required</label>}
        {error.gmail && !error.email &&<label className='text-danger mb-2'>Email is Required to @gmail.com</label>}


        <input type="password" className='form-control mt-3' value={data.password} onChange={(e)=>{setdata((prev)=>{return {...prev,password:e.target.value}})}} placeholder="Password" required/>
        {error.password && <label className='text-danger mb-1'>Password is Required</label>}

        <input type="password" className='form-control mt-3' value={data.cpassword} onChange={(e)=>{setdata((prev)=>{return {...prev,cpassword:e.target.value}})}} placeholder="Confirm Password" required/>
        {error.cpassword && <label className='text-danger mb-1'>Confirm Password is Required</label>}
        {error.passSame && !error.cpassword && !error.password &&<label className='text-danger mb-2'>Confirm Password is not same in password</label>}

 {(response.statusCode==201) ? <div className='mt-3 mb-3 text-success'>{response.response}</div> : <></>}
 {(response.statusCode==400) ? <div className='mt-3 mb-3 text-danger'>{response.response}</div> : <></>}

 {load && <div className='mt-3 mb-3 d-flex justify-content-center align-items-center'><span className='spinner-border'></span></div> }
       <br />
        <button type="submit" className='btn btn-success mt-2'  disabled={load} onClick={(ev)=>{submit(ev)}}>Register</button>
        <p className='mt-3'>Already have an account? <Link className='text-decoration-none' href="/Home">Login here</Link>.</p>
    </form>
        </div>
</div>
  )
}

export default page