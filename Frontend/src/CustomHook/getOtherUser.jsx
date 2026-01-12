import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from "../main";
import { setotherUser,  } from "../redux/userSlice";


const getOtherUser=()=>{
    let dispatch=useDispatch();
    let {userData}= useSelector(state=>state.user)
    useEffect(()=>{
        const fetchOtherUser = async()=>{
            try {
                let result = await axios.get(
             `${serverUrl}/api/user/others`,
              { withCredentials: true }
)

                dispatch(setotherUser(result.data))
                // console.log(result.data)
            } catch (error) {
               console.log(error)
            }
        }
        fetchOtherUser()
    },[userData])
}
export default getOtherUser