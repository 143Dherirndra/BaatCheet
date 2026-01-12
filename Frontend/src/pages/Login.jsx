
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.user.userData);
 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUserData(res.data));
      navigate("/Profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-blue-100 flex justify-center items-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-lg flex flex-col gap-[30px]">

        <div className="h-[200px] w-full bg-[#20c7ff] rounded-b-[30%] flex justify-center items-center">
          <h1 className="font-semibold text-[30px] text-gray-600">
            Login to <span className="text-white">Real Chat</span>
          </h1>
        </div>

        <form className="w-full flex flex-col gap-[20px] items-center" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 w-[90%] h-[50px] outline-none rounded-lg px-4"
            required
          />

          <div className="w-[90%] relative h-[50px] border-2 rounded-lg">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full outline-none px-4"
              required
            />
            <span
              className="absolute top-[10px] right-[20px] cursor-pointer text-[#20c7ff]"
              onClick={() => setShow(!show)}
            >
              {show ? "hide" : "show"}
            </span>
          </div>

          {error && <p className="text-red-500">*{error}</p>}

          <button type="submit" className="w-[200px] bg-[#20c7ff] h-11 rounded-full">
            {loading ? "Login..." : "Login"}
          </button>

          <p>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")} className="text-[#20c7ff] cursor-pointer">
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
