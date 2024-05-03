'use client'
import React, { useEffect, useState } from 'react'

function page() {
  let [toke,settoken]=useState('');
  let [edit,setedit]=useState([]);
  let [editdata,seteditdata]=useState('');
  let [dataTodo,setdata]=useState([]);
  let [load,setload]=useState(true);
  let [req,setreq]=useState(false);
  let [valid,isvalid]=useState(false);
  let [tod,setTodo]=useState('');
  let [login,notlogin]=useState(false);
  useEffect(()=>{
if(localStorage.getItem("Token")){

}
  },[])
  useEffect(()=>{
    setload(true)
    let tokens=localStorage.getItem("Token");
    if(tokens){
      fetch("http://localhost:3001/Api/myTodo",{
        headers:{
          authorization:`Bearer ${tokens}`
        }
      }).then(data =>  data.json()).then((data)=>{
        if(!data.ok){
    throw new Error(data.response);
        }
        notlogin(true);
        let arrEdit=[];
        data.data.todo.map((data)=>{
          arrEdit.push(false);
          return data;
        })
        if(arrEdit.length==0){
isvalid(true);
        }
        setedit(arrEdit);
  setdata(data.data.todo);
      }).catch((e)=>{
      }).finally(()=>{
        setload(false)
      })
    }else{
      setload(false)
    notlogin(false);

    }
  },[])
 async function deletes(id:Number){
    let tokens=localStorage.getItem("Token");
fetch(`http://localhost:3001/Api/remove/${id+1}`,{method:"DELETE",headers:{
  authorization:`Bearer ${tokens}`
}}).then((data)=>{
  return data.json();
}).then((datas)=>{
  if(datas.ok){
    let deletedata=dataTodo.splice(id,1);
    let copy=[...dataTodo]
    if(copy.length==0){
      isvalid(true)
    }
    setdata(copy);
  }
})
  }
 async function submitData() {
  setreq(true);
  console.log()
  await  fetch("http://localhost:3001/Api/todo",{
      method:"POST",
      headers:{
        authorization:`Bearer ${localStorage.getItem("Token")}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({todoData:tod})
  }).then((data)=>{
    return data.json()
  }).then((data)=>{
    isvalid(false)
    setdata((prev)=>{ return [...prev,data.newtod]});
    
  }).catch((e)=>{

  }).finally(()=>{
    setreq(false);
    setTodo('')

  })}
  function update(id) {
    setreq(true)
    let tokens=localStorage.getItem("Token");

    fetch(`http://localhost:3001/Api/update/${id+1}`,{method:"PUT",
    body:JSON.stringify({"todo":editdata})
    ,headers:{
      authorization:`Bearer ${tokens}`,
      "Content-Type":"application/json"
    },
  
}).then((data)=>{
  return data.json()
}).then((data)=>{
  
  let deletedata=dataTodo.splice(id,1,data.data);
  let copy=[...dataTodo]
  setdata(copy);
}).catch((e)=>{

}).finally(()=>{
  let copy=edit;
    copy.splice(id,1,false);
    let copy1=[...copy]
    setedit(copy1)
  setreq(false)
})
  }
  function editTodo(id,data) {
    seteditdata(data)
  let editboolean=  edit.map((data,ids)=>{
      if(ids==id){
        return true
      }
      return false;
    });
    setedit(editboolean)
  }
  function cancel(id) {
    let copy=edit;
    copy.splice(id,1,false);
    let copy1=[...copy]
    setedit(copy1)
  }
  return (
    <>
    {load && <div style={{height:'100vh',width:'100%'}} className='ms-0 me-0 d-flex justify-content-center align-items-center'>
      <span className='spinner-border text-danger'></span>
    </div>}
    {/* <div>Dashboard page</div> */}
    {!load && !login && <div style={{height:'100vh',width:'100%'}} className='ms-0 me-0 d-flex justify-content-center align-items-center'>
<p>please login or register</p>
    </div>}
    
    {!load && login &&
    <div className="">

    <div className="row ms-0 me-0 justify-content-center mt-5 mb-5">
     <div className="col-6">
        <label htmlFor="#todo" className='mb-3'> Todo List</label>
        <div className="row">
          <div className="col-10">

      <input type="text" disabled={req} value={tod} onInput={(e)=>{setTodo(e.target.value)}} placeholder='Enter todo list' className='form-control'  />
          </div>
          <div className="col-2">
      <button className="btn btn-primary" onClick={()=>{submitData()}}>submit</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row justify-content-center mt-5">

      <div className="col-6">
 {dataTodo.map((data,id)=>{
   return  <div className="row border align-items-center p-2 rounded mt-2 mb-2">
   {
   edit[id] &&
    <>
     <div className="col-8">
      <input type="text" disabled={req} value={editdata} onInput={(e)=>{ seteditdata(e.target.value)}}/>
     </div>
    <div className="col-2"><button className="btn btn-warning" onClick={()=>{cancel(id)}}>cancel</button></div>
    <div className="col-2"><button disabled={req} className="btn btn-success" onClick={()=>{ update(id)}}>submit</button></div>
    </>
    }
    {
      !edit[id] &&
      <>
   <div className="col-8">{data}</div>
   <div className="col-2"><button  className="btn btn-warning" onClick={()=>{editTodo(id,data)}}>Edit</button></div>
   <div className="col-2"><button className="btn  btn-danger" onClick={()=>{deletes(id)}}>Delete</button></div> 
    </>
    }
   </div>

          
        
      })}
      {/* return <div className='border mt-1 mb-1 d-flex justify-content-between p-1 align-items-center rounded'>{data} */}
    </div>
    </div>

      
    
    </div>}
    {valid && login && !load && <div style={{height:'40vh',width:'100%'}} className='ms-0 me-0 d-flex justify-content-center align-items-center'>
<p>Invalid Todo</p>
    </div>}
    </>
  )

    }
export default page;