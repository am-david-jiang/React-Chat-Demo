import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import Testimony from "../components/Testimony";
import Input from "../components/Input";
import Button from "../components/Button";
import LinkStyled from "../components/LinkSpan";

import useInput from "../hooks/useInput";

import { SignInResponse } from "../utils/Types";

import useAuthStore from "../stores/useAuthStore";

import "../sass/pages/login.scss";
import useTitle from "../hooks/useTitle";

export default function LoginPage() {
  const [username, setUsername] = useInput("");
  const [password, setPassword] = useInput("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  useTitle("Sign In");

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = new URLSearchParams();
      body.append("username", username);
      body.append("password", password);
      const result = (await (
        await fetch("http://localhost:5000/auth/signin", {
          method: "POST",
          body,
          credentials: "include",
          mode: "cors",
        })
      ).json()) as SignInResponse;
      if (result.success == false) {
        throw new Error("Signin Failed: " + result.msg);
      }
      login({
        username: result.username,
        avatar: result.avatar,
        token: result.token,
      });
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        toast(err.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <div className='login-navbar'>
          <Logo />
        </div>
        <div className='login-body'>
          <div>
            <div className='login-intro'>
              <h1>Welcome Back!</h1>
              <p>Login from here and enjoy your chating experience!</p>
            </div>
            <div className='login-input'>
              <Input
                type='text'
                displayBlock={true}
                state={username}
                handleChange={setUsername}
                placeholder='Username'
              />
              <Input
                type='password'
                displayBlock={true}
                state={password}
                handleChange={setPassword}
                placeholder='Password'
              />
            </div>
          </div>
          <div className='login-submit'>
            <Button text='Sign In' handleClick={handleLogin} />
            <p>
              Not have an account?
              <LinkStyled to='/signup'>Sign Up Here</LinkStyled>!
            </p>
          </div>
        </div>
      </div>
      <div className='login-cover'>
        <Testimony />
      </div>
    </div>
  );
}
