import {createSlice} from '@reduxjs/toolkit'


let Autho=createSlice({
    initialState:false,
    name:"Athentication",
    reducers:{
        fixAthu:(state,action)=>{
            let value=action.payload;
            state=value;
        }
    }
})

export let {fixAthu} = Autho.actions;