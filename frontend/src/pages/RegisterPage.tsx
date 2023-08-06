import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../components/Button";
import LinkStyled from "../components/LinkSpan";
import Logo from "../components/Logo";
import Testimony from "../components/Testimony";
import Input from "../components/Input";
import FileInput from "../components/FileInput";

import useInput from "../hooks/useInput";

import { SignUpResponse } from "../utils/Types";

import useAuthStore from "../stores/useAuthStore";

import "../sass/pages/register.scss";
import useTitle from "../hooks/useTitle";

export default function RegisterPage() {
  const [username, setUsername] = useInput("");
  const [password, setPassword] = useInput("");
  const [passwordConfirm, setPasswordConfirm] = useInput("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useTitle("Sign Up");

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (password !== passwordConfirm) {
        toast("Two password is not consist!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;
      }
      if (!fileInputRef.current || !fileInputRef.current.files) {
        throw new Error("Avatar not exist!");
      }
      const form = new FormData();
      form.append("username", username);
      form.append("password", password);
      form.append("avatar", fileInputRef.current.files[0]);
      const res = (await (
        await fetch("http://localhost:5000/auth/signup", {
          method: "POST",
          body: form,
          credentials: "include",
          mode: "cors",
        })
      ).json()) as SignUpResponse;
      if (!res.success) {
        throw new Error(`Sign Up Error: ${res.msg}`);
      }
      login({ username: res.username, avatar: res.avatar, token: res.token });
      navigate("/", { replace: true });
    } catch (err) {
      if (typeof err === "string") {
        toast(err, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else if (err instanceof Error) {
        toast(err.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      return;
    }
  };
  return (
    <div className='register'>
      <div className='register-container'>
        <div className='register-navbar'>
          <Logo />
        </div>
        <div className='register-body'>
          <div>
            <div className='register-intro'>
              <h1>Create Account</h1>
              <p>Login from here and enjoy your chating experience!</p>
            </div>
            <div className='register-input'>
              <Input
                state={username}
                handleChange={setUsername}
                placeholder='Username'
              />
              <Input
                state={password}
                handleChange={setPassword}
                placeholder='Password'
                type='password'
              />
              <Input
                state={passwordConfirm}
                handleChange={setPasswordConfirm}
                placeholder='Password Confirm'
                type='password'
              />
              <FileInput ref={fileInputRef} buttonText='Upload Avatar' />
            </div>
          </div>
          <div className='register-submit'>
            <Button text='Sign In' handleClick={handleRegister} />
            <p>
              Already have an account?
              <LinkStyled to='/signin'>Sign In.</LinkStyled>
            </p>
          </div>
        </div>
      </div>
      <div className='register-cover'>
        <Testimony />
      </div>
    </div>
  );
}
