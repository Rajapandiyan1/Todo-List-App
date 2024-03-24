import Register from '@/Components/Register';
// import {useNavigate} from 'react-router-dom'
import React from 'react'

function Layout({children}) {
// let route=useNavigate();

return (
    <>
    
{/* <Register children={children}/> */}
{children}
    </>
  )
}

export default Layout