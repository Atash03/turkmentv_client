'use client';
// src/app/sms/sign_up/page.tsx
import { useState, FormEvent, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Loader from '@/components/Loader';

const Page = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { login: loginUser, userLogedIn } = authContext;
  const { checkUserLoggedIn } = authContext;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    loginUser(login, password);
    setLogin('');
    setPassword('');
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <main className="container flex justify-center h-screen items-center ">
      <form onSubmit={handleSubmit} id="create-course-form">
        <div className="bg-[#F5F5FA] p-10 rounded-[25px] w-[522px] -mt-28 shadow-tableShadow">
          <h2 className="mb-10 text-[40px] leading-none text-#242429 font-semibold">SMS ulgamy</h2>
          <div className="flex flex-col gap-2 mb-5 leading-[150%]">
            <label htmlFor="login" className="text-[16px] font-semibold text-[#242429]">
              Login
            </label>
            <input
              id="login"
              type="text"
              className="input-style"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Login giriziň"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[16px] font-semibold text-[#242429]">
              Açar sözi
            </label>
            <input
              id="password"
              type="password"
              className="input-style"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Açar sözi giriziň"
            />
          </div>

          <button
            type="submit"
            className="p-3 bg-[#7A7ACC] text-[18px] leading-[150%] font-medium text-white w-full rounded-xl mt-[30px]">
            Ulgama gir
          </button>

          {userLogedIn === false ? (
            <p className="text-center pt-[16px] text-[16px] font-[600] text-red-400">
              Login ýa-da açar sözi ýalňyş
            </p>
          ) : null}
        </div>
      </form>
    </main>
  );
};

export default Page;
