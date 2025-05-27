import { RootState } from '@/redux/store';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

const UserLayout = () => {

    const navigate = useNavigate();
    const user = useSelector((state : RootState) => state.auth.user)
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",user);
    

    useEffect(()=> {
       if(user==null){
         navigate('/login')
       }
    },[])

  return (
    <div>
        <Outlet />
    </div>
  )
}

export default UserLayout