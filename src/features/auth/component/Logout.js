import { useEffect } from "react";
import { selectUser, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
console.log(user)
    useEffect(()=>{
        dispatch(signOutAsync())
    })

    // but useEffect runs after render, so we have to delay navigate part
    return ( 
        <>
        
        {user && <Navigate to='/login' replace={true}></Navigate>}
        </>
     );
}

export default Logout;