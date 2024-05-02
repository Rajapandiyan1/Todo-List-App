"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({children}) {
  let route=useRouter();
  useEffect(()=>{
if(localStorage.getItem("Token")){
  route.push("/Dashboard")
}
  },[])
  return (
  <div>
    
  </div>
  );
}
