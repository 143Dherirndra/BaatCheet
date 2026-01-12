import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../main";
import { setmessage } from "../redux/messageSlice";

const useGetMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    // 🛑 jab tak user select na ho, API call mat karo
    if (!selectedUser?._id) return;

    const fetchMessage = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/message/get/${selectedUser._id}`,
          { withCredentials: true }
        );

        dispatch(setmessage(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessage();
  }, [selectedUser, dispatch]);
};

export default useGetMessage;
