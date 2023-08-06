import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../stores/useAuthStore";

import { LogoutResponse } from "../utils/Types";

export default function Logout() {
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()

  const logoutHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await (await fetch('http://localhost:5000/auth/logout', {
        method: 'GET',
        credentials: 'include',
      })).json() as LogoutResponse;
      if (result.success === false) {
        throw new Error("Logout Failed: " + result.msg)
      }
      logout()
      navigate('/signin', { replace: true }) 
    } catch (err) {
      if (err instanceof Error) {
        toast(err.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
  }

  return (
    <div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}
