'use client'
import {useRouter} from 'next/router'
let router=useRouter();
export let route=(url)=>{
router.push(url);
}